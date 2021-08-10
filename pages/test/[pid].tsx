import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react';
import { setGlobalSound } from '../../store/actions/globalSound';
import {useHttpClient} from '../../util/hooks/http-hook';

export default function Test() {
  const router = useRouter();
  const { pid } = router.query;
  const [soundInfo, setSoundInfo] = useState<any>(null);
  const { isLoading, sendRequest } = useHttpClient();

  const fetchSoundInfo = useCallback(async () => {
      let response;

      try {
        response = await sendRequest(
          `http://localhost:5000/api/sounds/${pid}`
        );
        setSoundInfo({
          sound: response.sound,
          comments: response.comments,
          offset: response.comments.length,
          refreshFinished: response.comments.length !== 20
        });

        console.log(response)

      } catch (err) {}
    }, [pid, sendRequest]);

  useEffect(() => {
    fetchSoundInfo()
  }, [fetchSoundInfo])




  return (
    <Fragment>
      <div>
      TEST TEST {pid}
      </div>
      {soundInfo && (
        <div>
          {soundInfo.sound.name}
        </div>
      )}
    </Fragment>)
}