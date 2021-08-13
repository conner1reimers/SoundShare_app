import Head from 'next/head';
import Image from 'next/image';
import ActiveLink from '../../components/ActiveLink';
import Link from 'next/link';
import {useForm} from '../../util/hooks/useForm';
import Input from '../../components/common_reusable/Input';
import { VALIDATOR_EMAIL } from '../../util/validators';
import GlobalMsg from '../../components/GlobalMsg';
import {useGlobalMsg} from '../../util/hooks/useGlobalMsg';
import Media from 'react-media';
import SideContain from '../../components/shared/SideDrawer/SideContain'
import TopNav from '../../components/shared/SideDrawer/TopNav'
import { Fragment } from 'react';
import { Header } from '../../components/Header';
import Homepage from '../../components/Homepage/Homepage';

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


  return (
    <Fragment>
      <Homepage/>
    </Fragment>
  )
}
