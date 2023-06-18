/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from 'react'
import { GlobalStyle } from './styles/global'
import * as S from './styles';
import { IpcRendererEvent, ipcRenderer } from 'electron';
import { IServerFeedback } from '../types/ServerFeedback';


function App() {
  const [host, setHost] = useState<string>('');
  const [port, setPort] = useState<number | string>('');
  const [response, setResponse] = useState<IServerFeedback | null>(null);
  const [hostError, setHostError] = useState(false);
  const [portError, setPortError] = useState(false);
  const isServerRunning = response?.started;

  function handleServerStart() {
    ipcRenderer.send('start', {
      host: host || 'localhost',
      port: port || 3000
    })
  }

  function handleServerStop() {
    ipcRenderer.send('stop')
  }

  function handleHost(e: React.ChangeEvent<HTMLInputElement>) {
    setHostError(e.target.value ? false : true)
    setHost(e.target.value);
  }

  function handlePort(e: React.ChangeEvent<HTMLInputElement>) {
    setPortError(e.target.value ? false : true)
    setPort(e.target.value ? parseInt(e.target.value) : e.target.value)
  }

  useEffect(() => {
    const handleStart = (_: IpcRendererEvent, eventResponse: IServerFeedback) => {
      if (eventResponse) {
        setResponse(eventResponse);
      }
    };

    ipcRenderer.on('start', handleStart)

    return () => {
      ipcRenderer.removeListener('start', handleStart)
    }
  }, [])

  useEffect(() => {
    const handleStop = (_: IpcRendererEvent, event: IServerFeedback) => {
      if (event) {
        setResponse(event);
      }
    };

    ipcRenderer.on('stop', handleStop);

    return () => {
      ipcRenderer.removeListener('stop', handleStop);
    };
  }, [])

  return (
    <S.Container>
      <h1>Server</h1>
      <S.ItemsContainer>
        <S.Items>
          <span>Server Host</span>
          <S.Input value={host} onChange={handleHost} />
        </S.Items>
        {hostError && <S.Error>Host is required</S.Error>}
        <S.Items>
          <span>Server Port</span>
          <S.Input value={port} onChange={handlePort} type='number' />
        </S.Items>
        {portError && <S.Error>Port is required</S.Error>}
        <S.Button onClick={isServerRunning ? handleServerStop : handleServerStart} isOn={isServerRunning}>
          {isServerRunning ? 'Stop' : 'Start'}
        </S.Button>
      </S.ItemsContainer>
      {response && <S.Response error={!response.started}>{response.message}</S.Response>}
      <GlobalStyle />
    </S.Container>
  )
}

export default App
