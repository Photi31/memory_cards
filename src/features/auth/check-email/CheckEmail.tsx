import s2 from "features/auth/auth.module.css";
import s1 from "app/App.module.css";
import s from "./CheckEmail.module.css";
import { MyButton } from "components/button/MyButton";
import checkEmail from "images/sendEmail.svg";

// type CheckEmailProps = {
//   email: string;
// };

export const CheckEmail = () => {
  const checkEmailHandler = (buttonName: string) => {};

  return (
    <div className={s2.authContainer}>
      <h3 className={s1.title_fz26}>Forgot your password?</h3>
      <img className={s.checkEmailImg} src={checkEmail} alt="check email" />
      <div className={s.description}>
        We’ve sent an Email with instructions to example@mail.com
      </div>
      <MyButton
        size="big"
        color="blue"
        name="Send Instructions"
        onClick={checkEmailHandler}
      />
    </div>
  );
};
