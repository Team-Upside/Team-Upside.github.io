import { useEffect, useState } from 'react';

export enum ScriptStatus {
  Loading = 'LOADING',
  Ready = 'READY',
  Error = 'ERROR',
  Idle = 'IDLE',
}

const useScript = (src: string, active = true) => {
  const [status, setStatus] = useState<ScriptStatus>(
    active ? ScriptStatus.Loading : ScriptStatus.Idle
  );

  useEffect(() => {
    if (!active) {
      setStatus(ScriptStatus.Idle);
      return undefined;
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`
    );

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', ScriptStatus.Loading);
      document.body.appendChild(script);
      const setAttributeFromEvent = (event: Event) => {
        script?.setAttribute(
          'data-status',
          event.type === 'load' ? ScriptStatus.Ready : ScriptStatus.Error
        );
      };

      script.addEventListener('load', setAttributeFromEvent);
      script.addEventListener('error', setAttributeFromEvent);
    } else {
      setStatus(script.getAttribute('data-status') as ScriptStatus);
    }

    const setStateFromEvent = (event: Event) => {
      setStatus(
        event.type === 'load' ? ScriptStatus.Ready : ScriptStatus.Error
      );
    };

    script.addEventListener('load', setStateFromEvent);
    script.addEventListener('error', setStateFromEvent);

    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent);
        script.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [src, active]);

  return status;
};

export default useScript;
