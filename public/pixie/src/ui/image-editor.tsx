import React, {useCallback, useEffect, useRef} from 'react';
import {IntlProvider} from 'react-intl';
import {domAnimation, LazyMotion, m, Variants} from 'framer-motion';
import {DropzoneOptions, useDropzone} from 'react-dropzone';
import clsx from 'clsx';
import {VisuallyHidden} from '@react-aria/visually-hidden';
import {useLayoutEffect} from '@react-aria/utils';
import {initTools} from '../tools/init-tools';
import {observeSize} from '../common/utils/dom/observe-size';
import {getBoundingClientRect} from '../common/utils/dom/get-bounding-client-rect';
import {initThemes, useActiveTheme} from '../utils/init-themes';
import {OverlayPositionContext} from '../common/ui/overlays/overlay-position-context';
import {ToolbarContainer} from './toolbar/toolbar-container';
import {LoadingIndicator} from './stage/loading-indicator';
import {CanvasWrapper} from './stage/canvas-wrapper';
import {ToolControlsOverlay} from './navbar/tool-controls-overlay';
import {Navbar} from './navbar/navbar';
import {OverlayPanelContainer} from './overlay-panel-container';
import {useStore} from '../state/store';
import {ToastContainer} from '../common/ui/toast/toast-container';
import {state, tools} from '../state/utils';
import {UploadedFile} from '../common/uploads/uploaded-file';
import {imgContentTypes, stateContentType} from '../tools/import/import-tool';
import {buildUploadInputAccept} from '../common/uploads/utils/create-upload-input';
import {handleCanvasKeydown} from './handle-canvas-keydown';
import {IconButton} from '../common/ui/buttons/icon-button';
import {CloseIcon} from '../common/icons/material/Close';
import {Underlay} from '../common/ui/overlays/modal/underlay';
import {useEditorMode} from './editor-mode';

export function ImageEditor() {
  const activeLang = useStore(s => s.config.activeLanguage) || 'en';
  const languages = useStore(s => s.config.languages);
  const isVisible = useStore(s => s.config.ui?.visible) ?? true;
  const navPosition = useStore(s => s.config.ui?.nav?.position) ?? 'bottom';
  const menuPosition = useStore(s => s.config.ui?.menubar?.position) ?? 'top';
  const allowEditorClose = useStore(s => s.config.ui?.allowEditorClose) ?? true;
  const messages = languages?.[activeLang] || {};
  const activeTheme = useActiveTheme();
  const rootEl = useRef<HTMLDivElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const {isModal, isMobile} = useEditorMode();

  const onDrop: DropzoneOptions['onDrop'] = useCallback(files => {
    if (state().activeTool || state().dirty || !files.length) return;
    const uploadedFile = new UploadedFile(files[0]);
    if (state().config.tools?.import?.openDroppedImageAsBackground ?? false) {
      tools().import.openBackgroundImage(uploadedFile);
    } else {
      tools().import.openUploadedFile(uploadedFile);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    rootRef: stageRef,
  } = useDropzone({
    onDrop,
    accept: buildUploadInputAccept({...imgContentTypes(), ...stateContentType}),
  });

  useEffect(() => {
    // editor already booted
    if (state().fabric) return;

    initTools(canvasRef.current);

    if (state().config.ui?.defaultTool) {
      state().setActiveTool(state().config.ui?.defaultTool!, null);
    }

    tools()
      .canvas.loadInitialContent()
      .then(() => {
        state().config.onLoad?.(state().editor);
      });

    const unobserveStage = observeSize(stageRef.current!, () => {
      state().setStageSize(getBoundingClientRect(stageRef.current!));
    });
    const unobserveCanvas = observeSize(canvasRef.current, () => {
      state().setCanvasSize(getBoundingClientRect(canvasRef.current));
    });
    return () => {
      unobserveStage();
      unobserveCanvas();
    };
  }, [stageRef]);

  // make sure css variables are added before editor ui is rendered
  useLayoutEffect(() => {
    initThemes(rootEl.current, activeTheme);
  }, [activeTheme]);

  const variants: Variants = {
    visible: {
      opacity: 1,
      scale: 1,
      display: 'flex',
    },
    hidden: {opacity: 0, transitionEnd: {display: 'none'}},
  };

  const rootClassName = clsx(
    'pixie-root flex flex-col overflow-hidden bg-background text-main no-tap-highlight w-full h-full',
    {
      relative: !isModal,
      'fixed inset-0 w-full h-full z-20': isModal,
      'shadow-lg border rounded-md m-auto max-h-[calc(100vh-90px)] max-w-[calc(100vw-90px)]':
        isModal && !isMobile,
    }
  );

  const showCloseIcon = isModal && isVisible && !isMobile && allowEditorClose;
  const showUnderlay = isModal && isVisible;

  return (
    <LazyMotion features={domAnimation} strict>
      {showCloseIcon && (
        <IconButton
          className="z-20 fixed right-2 top-2 text-white"
          size="lg"
          onPress={() => {
            state().editor.close();
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      {showUnderlay && <Underlay position="fixed" disableInitialTransition />}
      <m.div
        ref={rootEl}
        initial={false}
        variants={variants}
        animate={isVisible ? 'visible' : 'hidden'}
        className={rootClassName}
      >
        <OverlayPositionContext.Provider
          value={{
            boundary: rootEl,
            portalContainer: rootEl,
            shouldFlip: false,
            placement: navPosition === 'bottom' ? 'top' : 'bottom',
            maxHeight: '400px',
          }}
        >
          <IntlProvider
            locale={activeLang}
            defaultLocale="en"
            messages={messages}
          >
            {menuPosition === 'top' && <ToolbarContainer />}
            {navPosition === 'top' && <Navbar />}

            <main
              className="relative flex-auto my-20 overflow-hidden outline-none"
              {...getRootProps({
                onKeyDownCapture: handleCanvasKeydown,
              })}
            >
              <VisuallyHidden>
                <input {...getInputProps} />
              </VisuallyHidden>
              <LoadingIndicator />
              <CanvasWrapper ref={canvasRef} />
            </main>
            <ToolControlsOverlay />
            {navPosition === 'bottom' && <Navbar />}
            {menuPosition === 'bottom' && <ToolbarContainer />}
            <OverlayPanelContainer />
            <ToastContainer />
          </IntlProvider>
        </OverlayPositionContext.Provider>
      </m.div>
    </LazyMotion>
  );
}
