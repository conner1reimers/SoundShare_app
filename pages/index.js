import Head from 'next/head';
import Image from 'next/image';
import ActiveLink from '../components/ActiveLink';
import Link from 'next/link';
import {useForm} from '../util/hooks/useForm';
import Input from '../components/common_reusable/Input';
import { VALIDATOR_EMAIL } from '../util/validators';
import GlobalMsg from '../components/GlobalMsg';
import {useGlobalMsg} from '../util/hooks/useGlobalMsg';

export default function Home() {

  const [formState, inputHandler] = useForm({
    email: {
        value: '',
        isValid: false
    },
    username: {
        value: '',
        isValid: false
    },
    password: {
        value: '',
        isValid: false
    },
    password2: {
        value: '',
        isValid: false
    },
  }, false);

  const setGlobalMsg = useGlobalMsg();

  const showMsg = () => {
    setGlobalMsg(formState.inputs.email.value, 'success')
  }



  return (
    <div className="root-app-container">
      <GlobalMsg/>
      
        <button onClick={showMsg}>
        heyyoo
        </button>



      {formState && formState.inputs && formState.inputs.email.value && <Link href={{pathname: `test/[pid]`, query: {pid: formState.inputs.email.value}}}>
        <a className="btn nohover">
        heyyoo
        </a>
      </Link>}

      <Input
        class="auth-grid--inputSection--input"
        onInput={inputHandler}
        label="email"
        validators={VALIDATOR_EMAIL()}
        element="input"
        id="email"
        errorText="Please enter a valid email address"
        auth
        labelClass="auth-grid--inputSection--input--label"
        labelUpClass="auth-grid--inputSection--input--label--up"
        formControlClass="uploadmodal-big--info-form--input--formcontrol auth-grid--inputSection--input--formcontrol uploadmodal-big--info-form--input--formcontrol--name"
        focusCap
      />
      
    </div>
  )
}
