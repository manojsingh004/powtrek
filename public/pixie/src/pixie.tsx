import React from 'react';
import ReactDOM from 'react-dom';
import {Canvas, IEvent} from 'fabric/fabric-impl';
import deepmerge from 'deepmerge';
import styleInject from 'style-inject';
import NP from 'number-precision';
import {init as initSentry} from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';
import {
  DEFAULT_CONFIG,
  PIXIE_VERSION,
  PixieConfig,
} from './config/default-config';
import {useStore} from './state/store';
import {ObjectModifiedEvent} from './objects/object-modified-event';
import {ImageEditor} from './ui/image-editor';
import type {Tools} from './tools/init-tools';
import {state, tools} from './state/utils';
import {EditorState} from './state/editor-state';
import {resetEditor} from './utils/reset-editor';
import {fetchStateJsonFromUrl} from './tools/import/fetch-state-json-from-url';
import {getCurrentCanvasState} from './tools/history/state/get-current-canvas-state';
import {SerializedPixieState} from './tools/history/serialized-pixie-state';
import {setActiveTool} from './ui/navbar/set-active-tool';
import {ToolName} from './tools/tool-name';
import {canvasIsEmpty} from './tools/canvas/canvas-is-empty';
import css from './styles.css';
import {showToast} from './common/ui/toast/show-toast';

NP.enableBoundaryChecking(false);

export class Pixie {
  tools: Tools = {} as any;
  fabric: Canvas | null = null;

  get state() {
    return state();
  }
  get version() {
    return PIXIE_VERSION;
  }
  get defaultConfig() {
    return DEFAULT_CONFIG;
  }

  constructor(config: Partial<PixieConfig>) {
    if (config.sentryDsn) {
      initSentry({
        dsn: config.sentryDsn,
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
      });
    }
    this.setConfig(config);
    if (import.meta.env.PROD) {
      styleInject(css);
    }
    if (!config.selector) {
      throw new Error('Pixie required "selector" option.');
    }
    const container = document.querySelector(config.selector);
    if (!container) {
      return;
    }
    container.classList.add('pi');
    useStore.setState({editor: this});
    ReactDOM.render(
      <React.StrictMode>
        <ImageEditor />
      </React.StrictMode>,
      container
    );
  }

  /**
   * Open editor.
   */
  open(config: Partial<PixieConfig> = {}) {
    if (state().config.ui?.visible) return;
    this.setConfig(deepmerge(config, {ui: {visible: true}}));
    requestAnimationFrame(() => {
      tools().zoom.fitToScreen();
      tools().history.addInitial();
      if (canvasIsEmpty() && state().config.ui?.openImageDialog?.show) {
        this.togglePanel('newImage', true);
      }
      state().config.onOpen?.();
    });
  }

  /**
   * Close editor.
   */
  close() {
    if (!state().config.ui?.visible) return;
    this.setConfig({ui: {visible: false}});
    state().config.onClose?.();
  }

  /**
   * Override editor configuration.
   */
  setConfig(config: Partial<PixieConfig>) {
    state().setConfig(config);
  }

  /**
   * Open file upload window and add selected image to canvas.
   */
  uploadAndAddImage() {
    return tools().import.uploadAndAddImage();
  }

  /**
   * Open file upload window and replace canvas contents with selected image.
   */
  uploadAndReplaceMainImage() {
    return tools().import.uploadAndReplaceMainImage();
  }

  /**
   * Open file upload window and replace canvas contents with selected state file.
   */
  uploadAndOpenStateFile() {
    return tools().import.uploadAndOpenStateFile();
  }

  /**
   * Clear current canvas and open a new one at specified size.
   */
  newCanvas(width: number, height: number, bgColor?: string) {
    return tools().canvas.openNew(width, height, bgColor);
  }

  /**
   * Get current canvas state as json string.
   */
  getState(customProps?: string[]) {
    return JSON.stringify(getCurrentCanvasState(customProps));
  }

  /**
   * Replace current canvas contents with specified pixie state.
   */
  setState(data: string | SerializedPixieState) {
    return tools().import.loadState(data);
  }

  /**
   * Replace current canvas contents with pixie state file loaded from specified url.
   */
  async setStateFromUrl(url: string) {
    const stateObj = await fetchStateJsonFromUrl(url);
    return tools().import.loadState(stateObj);
  }

  /**
   * Open specified tool (crop, draw, text etc.)
   */
  openTool(name: ToolName) {
    setActiveTool(name);
  }

  /**
   * Apply any pending changes from currently open tool.
   * This is identical to clicking "apply" button in the editor.
   */
  applyChanges() {
    state().applyChanges();
  }

  /**
   * Cancel any pending changes from currently open tool.
   * This is identical to clicking "cancel" button in the editor.
   */
  cancelChanges() {
    state().cancelChanges();
  }

  /**
   * Fully reset editor state and optionally
   * override specified configuration.
   */
  async resetEditor(config?: PixieConfig) {
    await resetEditor(config);
    await tools().canvas.loadInitialContent();
  }

  /**
   * Toggle specified floating panel.
   */
  togglePanel(name: keyof EditorState['openPanels'], isOpen?: boolean) {
    state().togglePanel(name, isOpen);
  }

  /**
   * Listen to specified canvas event.
   * (List of all available events can be found in the documentation)
   */
  // @ts-ignore
  on(event: 'object:modified', handler: (e: ObjectModifiedEvent) => void): void;
  on(event: string, handler: (e: IEvent) => void): void {
    this.fabric?.on(event, handler);
  }

  /**
   * Check if any modifications made to canvas have not been applied yet.
   */
  isDirty() {
    return state().dirty;
  }

  /**
   * @hidden
   */
  get(name: keyof Tools) {
    return this.tools[name];
  }

  /**
   * Display specified notification message in the editor.
   */
  notify(message: string) {
    return showToast(message);
  }

  /**
   * Create a new editor instance.
   */
  static init(config: PixieConfig): Promise<Pixie> {
    return new Promise(resolve => {
      const userOnLoad = config.onLoad;
      config.onLoad = (instance: Pixie) => {
        // call user specified "onLoad" function"
        userOnLoad?.(instance);
        resolve(instance);
      };
      (() => new this(config))();
    });
  }
}
