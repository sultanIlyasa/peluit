import Styles from "@styles/auth/AuthForm.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const AuthForm = ({ wSubmit, fHeader, fDesc, bLabel, children }) => {
  const Router = useRouter();

  return (
    <>
      <div className={Styles.kompetenLogo}>
        <Image
          src="/LOGO.png"
          width={160}
          height={160}
          alt="Logo Kompeten"
          onClick={() => Router.push("/")}
          style={{ cursor: "pointer", margin: "2px auto" }}
        />
      </div>
      <form onSubmit={wSubmit} className={Styles.authForm}>
        <h2 className={Styles.authHeader}>{fHeader}</h2>
        <p className={Styles.authDesc}>{fDesc}</p>
        {children}
        <div className="mb-3">
          {bLabel === "Login" && (
            <button
              type="submit"
              value="submit"
              className={Styles.authButton}
            >
              {bLabel}
            </button>
          )}
          {bLabel === "Register" && (
            <button
              type="submit"
              value="submit"
              className={Styles.authButton}
            >
              {bLabel}
            </button>
          )}
          {bLabel === "Reset Password" && (
            <button
              type="submit"
              value="submit"
              className={Styles.authButton}
            >
              {bLabel}
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AuthForm;