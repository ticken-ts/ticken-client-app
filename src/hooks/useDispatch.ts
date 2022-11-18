import {useDispatch} from 'react-redux';
import { AppDispatch } from '@app/redux/store';

const useAppDispatch = () => useDispatch<AppDispatch>()

export default useAppDispatch;
