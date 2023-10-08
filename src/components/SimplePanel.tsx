import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { ConnectForm } from './connect-form';
import { useStore, useStream } from '../state';
import { VideoStream } from './video-stream';
import { MotionArrows } from './motion-arrows';
import { useMotionControls } from '../motion';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);
  const { status, connectOrDisconnect, streamClient, baseClient } = useStore();
  const stream = useStream(streamClient, 'cam');
  const [motionState, requestMotion] = useMotionControls(baseClient);
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <ConnectForm status={status} onSubmit={connectOrDisconnect} />
      <VideoStream stream={stream}>

      </VideoStream>
      <div className={styles.textBox}>
        <div>Connection Status: {status}</div>
      </div>
    </div>
  );
};
