import { useForm } from "react-hook-form";
import image from "../../../assets/login.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import admin from "../../../assets/solar_user-bold.png";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // إرسال البيانات إلى الخادم
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#81A4A6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 0",
  };

  const cardStyle = {
    display: "flex",
    width: "80%",
    maxWidth: "1000px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const leftPanelStyle = {
    flex: 1,
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
  };

  const rightPanelStyle = {
    flex: 1,
    bordertRadius: "10px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  const inputGroupStyle = {
    backgroundColor: "#F2F4F7",
    borderRadius: "10px",
    border: "none",
    padding: "8px 15px",
    marginBottom: "8px",
  };

  const inputStyle = {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    width: "100%",
  };

  const iconStyle = {
    color: "#A0A0A0",
    marginRight: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={leftPanelStyle}>
          <h2
            className="text-center"
            style={{ color: "#81A4A6", fontFamily: "Lobster, sans-serif" }}
          >
            YumYard
          </h2>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h4 className="mb-2" style={{ fontWeight: "500" }}>
              Sign in
            </h4>
            <Link
              to="/auth/login"
              className="text-decoration-none text-dark d-flex flex-column justify-content-center align-items-center"
            >
              <img
                src={admin}
                alt="Admin Icon"
                className="mb-2"
                style={{ width: "40px", height: "40px" }}
              />
              <h6>User Login</h6>
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* حقل ID بدل البريد الإلكتروني */}
            <label htmlFor="id" className="form-label">
              ID
            </label>
            <div className="d-flex align-items-center" style={inputGroupStyle}>
              <i className="fas fa-id-badge" style={iconStyle}></i>
              <input
                type="text"
                id="id"
                placeholder="Enter Your ID"
                style={inputStyle}
              />
            </div>

            {/* حقل كلمة المرور */}
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="d-flex align-items-center" style={inputGroupStyle}>
              <i className="fas fa-lock" style={iconStyle}></i>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                style={inputStyle}
                {...register("password", { required: "Password is required" })}
              />
              <i className="fas fa-eye-slash" style={iconStyle}></i>
            </div>
            {errors.password && (
              <p className="text-danger mb-2" style={{ fontSize: "0.8rem" }}>
                {errors.password.message}
              </p>
            )}

            <button
              type="submit"
              className="btn w-100 mt-4"
              style={{
                backgroundColor: "#328286",
                color: "white",
                borderRadius: "15px",
                padding: "10px 0",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              Sign In
            </button>

           
          </form>
        </div>

        <div style={rightPanelStyle}>
          <img
            src={image}
            alt="Delicious food in a bowl"
            className="w-100 h-100"
            style={{ objectFit: "cover", opacity: 0.8 }}
          />
        </div>
      </div>
    </div>
  );
}
