import { useForm } from "react-hook-form";
import image from "../../assets/register.png"; // تأكد من تحديث المسار الصحيح لصورة الـ background
import "@fortawesome/fontawesome-free/css/all.min.css"; // استيراد Font Awesome

export default function Register() {
  // تهيئة useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // دالة تُنفذ عند إرسال النموذج بنجاح
  const onSubmit = (data) => {
    console.log(data);
    // يمكنك هنا إضافة منطق إرسال البيانات إلى الخادم
  };

  // تنسيقات الـ background والألوان استنادًا إلى الصورة
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#81A4A6", // لون الخلفية الفاتح
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 0",
  };

  const cardStyle = {
    display: "flex",
    width: "80%", // عرض البطاقة الكلي
    maxWidth: "1000px",
    borderRadius: "20px", // حواف مستديرة كبيرة
    overflow: "hidden", // هام لضمان عدم خروج المحتوى
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // ظل خفيف
  };

  const leftPanelStyle = {
    flex: 1,
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const rightPanelStyle = {
    flex: 1,
    backgroundColor: "#81A4A6", // لون الخلفية في الجزء الأيمن (قد يختلف قليلاً عن الصورة)
    bordertRadius: "20px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  const inputGroupStyle = {
    backgroundColor: "#F2F4F7", // لون خلفية حقل الإدخال
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
    color: "#A0A0A0", // لون الأيقونة
    marginRight: "10px",
  };

  const passwordReqStyle = {
    fontSize: "0.85rem",
    color: "#777",
    marginTop: "5px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* الجزء الأيسر: نموذج التسجيل */}
        <div style={leftPanelStyle}>
          
      <h2
  className="text-center "
  style={{
    color: "#81A4A6",
    fontFamily: "Lobster, sans-serif"
  }}
>
  YumYard
</h2>
<h4 className=" mb-2" style={{ fontWeight: "500" }}>
            Sign Up
          </h4>


          <form onSubmit={handleSubmit(onSubmit)}>
            {/* حقل اسم المستخدم */}
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="d-flex align-items-center" style={inputGroupStyle}>
              <i className="fas fa-user" style={iconStyle}></i>
              <input
                type="text"
                id="username"
                placeholder="Enter Your Username"
                style={inputStyle}
                {...register("username", { required: "Username is required" })}
              />
            </div>
            {errors.username && (
              <p className="text-danger mb-2" style={{ fontSize: "0.8rem" }}>
                {errors.username.message}
              </p>
            )}

            {/* حقل البريد الإلكتروني */}
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="d-flex align-items-center" style={inputGroupStyle}>
              <i className="fas fa-envelope" style={iconStyle}></i>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                style={inputStyle}
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="text-danger mb-2" style={{ fontSize: "0.8rem" }}>
                {errors.email.message}
              </p>
            )}

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
              <i className="fas fa-eye-slash" style={iconStyle}></i> {/* أيقونة إظهار/إخفاء */}
            </div>
            {errors.password && (
              <p className="text-danger mb-2" style={{ fontSize: "0.8rem" }}>
                {errors.password.message}
              </p>
            )}

            {/* حقل تأكيد كلمة المرور */}
            <label htmlFor="confirmPassword" className="form-label">
              confirm password
            </label>
            <div className="d-flex align-items-center" style={inputGroupStyle}>
              <i className="fas fa-lock" style={iconStyle}></i>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Your Password"
                style={inputStyle}
                {...register("confirmPassword", {
                  required: "Confirming password is required",
                })}
              />
              <i className="fas fa-eye-slash" style={iconStyle}></i>
            </div>
            {errors.confirmPassword && (
              <p className="text-danger mb-3" style={{ fontSize: "0.8rem" }}>
                {errors.confirmPassword.message}
              </p>
            )}

            {/* متطلبات كلمة المرور */}
            <div style={passwordReqStyle}>
              <i className="fas fa-circle" style={{ fontSize: "0.5rem", marginRight: "5px" }}></i>
              Use 8 or more characters
              <i className="fas fa-circle" style={{ fontSize: "0.5rem", marginLeft: "15px", marginRight: "5px" }}></i>
              One Uppercase character
              <i className="fas fa-circle" style={{ fontSize: "0.5rem", marginLeft: "15px", marginRight: "5px" }}></i>
              One special character
            </div>

            {/* خانة الاشتراك في رسائل البريد الإلكتروني */}
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="receiveEmails"
                {...register("receiveEmails")}
              />
              <label className="form-check-label" htmlFor="receiveEmails" style={{ fontSize: "0.9rem" }}>
                I want to receive emails about the product, feature updates, events, and
                marketing promotions.
              </label>
            </div>

            {/* رابط شروط الاستخدام وسياسة الخصوصية */}
            <p className="mb-2" style={{ fontSize: "0.85rem", color: "#777" }}>
              By creating an account, you agree to the <a href="#" style={{ color: "#328286" }}>Terms of Use</a> and <a href="#" style={{ color: "#328286" }}>Privacy Policy</a>.
            </p>

            {/* زر التسجيل */}
            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "#328286",
                color: "white",
                borderRadius: "15px",
                padding: "10px 0",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              Sign Up
            </button>

            {/* رابط تسجيل الدخول */}
            <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
              Already have an account? <a href="/auth/login" style={{ color: "#328286", fontWeight: "600" }}>Log in</a>
            </p>
          </form>
        </div>

        {/* الجزء الأيمن: الصورة */}
        <div style={rightPanelStyle}>
          {/* قد تحتاج إلى تعديل طريقة عرض الصورة لتطابق تصميم الـ background */}
          <img
            src={image}
            alt="Delicious food in a bowl"
            className=" w-100 h-100"
            style={{ objectFit: "cover", opacity: 0.8 }} // تنسيق للصورة لتملأ المساحة
          />
        </div>
      </div>
    </div>
  );
}