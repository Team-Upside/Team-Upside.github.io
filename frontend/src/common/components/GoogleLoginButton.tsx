import { FC, memo, useEffect, useRef } from 'react';
import { useAuth } from '../auth';
import useScript, { ScriptStatus } from '../hooks/useScript';
import { css } from '@emotion/react';

const containerStyle = css`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const GoogleLoginButton: FC = () => {
  const { setGoogleIdToken } = useAuth();
  const googleButton = useRef<HTMLDivElement>(null);
  const googleScriptStatus = useScript(
    'https://accounts.google.com/gsi/client'
  );

  useEffect(() => {
    if (googleScriptStatus !== ScriptStatus.Ready || !googleButton.current)
      return;

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '',
      auto_select: true,
      callback: ({ credential }) => {
        setGoogleIdToken(credential);
      },
    });

    google.accounts.id.renderButton(googleButton.current, {
      theme: 'outline',
      size: 'large',
    });
  }, [googleScriptStatus, setGoogleIdToken]);

  return (
    <div css={containerStyle}>
      <div ref={googleButton} />
    </div>
  );
};

export default memo(GoogleLoginButton);
