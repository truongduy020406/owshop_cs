import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/fields/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { validationSchema } from '../../../utils/validation';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../../redux/api/auth';
import { toast } from 'react-toastify';

const schema = yup.object({
  userName: validationSchema.string,
  email: validationSchema.email,
  password: validationSchema.password,
  confirmPassword: validationSchema.password,
});

const SignUpPage = () => {
  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (getValues('password') !== getValues('confirmPassword')) {
      return toast.error('Password not match', {
        autoClose: 3000,
        position: 'bottom-right',
      });
    }

    dispatch(registerAction(data));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto h-20 flex justify-between items-center p-4">
        <div className="flex items-center">
          <img
            src="https://png.pngtree.com/png-vector/20190322/ourlarge/pngtree-online-shop-logo-vector-template-design-illustration-png-image_860085.jpg"
            alt=""
            className="h-20 w-20"
          />
          <h1 className="font-medium text-2xl ml-5">Đăng Ký</h1>
        </div>
        <div>
          <a href="" className="text-red-600">
            Bạn cần giúp đỡ?
          </a>
        </div>
      </div>
      <div className="bg-[#f85959] h-[500px] flex justify-center items-center bg-[url('/public/images/bg_login/bg_login.jpg')]">
        <div className="flex justify-center items-center h-[500px] w-[1040px]">
          <div className="w-96 h-72 "></div>
          <div className=" w-[400px] bg-white p-8 rounded-none">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-2xl font-semibold mb-6">Đăng Ký</h1>
              <InputField
                name="userName"
                type="text"
                control={control}
                placeholder="Tên người dùng"
                className="rounded-none mb-3"
              />

              <InputField
                name="email"
                control={control}
                placeholder="Email/Tên đăng nhập"
                className="rounded-none mb-3"
              />

              <InputField
                name="password"
                type="password"
                control={control}
                placeholder="Mật khẩu"
                className="rounded-none mb-3"
              />

              <InputField
                name="confirmPassword"
                type="password"
                control={control}
                placeholder="Xác nhận Mật khẩu"
                className="rounded-none mb-3"
              />

              <Button
                type="primary"
                htmlType="submit"
                danger
                block
                className="rounded-none"
              >
                Đăng Ký
              </Button>

              <div className="flex items-center">
                <div className="h-[1px]  bg-[#dbdbdb] flex-auto"></div>
                <span className="mx-4 text-neutral-500">Hoặc</span>
                <div className="h-[1px] w-[4/4] bg-[#dbdbdb] flex-auto"></div>
              </div>

              <div className="flex justify-between mt-5">
                <div className="w-36 border-solid border-2 flex justify-center items-center">
                  <button className="bg-white p-2 font-semibold text-blue-700  ">
                    <svg
                      className="mt-1 w-5 h-5 fill-current"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <span className="ml-1 text-black font-normal">FaceBook</span>
                </div>
                <div className="w-36 border-solid border-2 flex justify-center items-center">
                  <button className=" p-2 font-semibold text-white ">
                    <img
                      src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                      alt=""
                    />
                  </button>
                  <span className="ml-1 text-black font-normal">Google</span>
                </div>
              </div>

              <div className="flex items-center justify-center mt-5">
                Bạn đã có tài khoản?
                <Link to={'/login'} className="text-red-700">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
