import { useForm } from "react-hook-form";
import image from "../../assets/auth.png"; // تأكد من تحديث المسار الصحيح لصورة الـ background
import "@fortawesome/fontawesome-free/css/all.min.css"; // استيراد Font Awesome
import admin from "../../assets/eos-icons_admin.png"
import { Link } from "react-router-dom";
export default function Login() {
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
<div className="d-flex align-items-center justify-content-between mb-4">
<h4 className=" mb-2" style={{ fontWeight: "500" }}>
            Sign in
          </h4>
            <Link 
           to="/auth/login/adminlogin"
           className="text-decoration-none text-dark d-flex flex-column justify-content-center align-items-center"
         >
           <img 
             src={admin} 
             alt="Admin Icon" 
             className="mb-2" 
             style={{ width: "40px", height: "40px" }} 
           />
           <h6>admin Login</h6>
         </Link>
</div>

          <form onSubmit={handleSubmit(onSubmit)}>

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
              className=""
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



           
           

           

            {/* زر التسجيل */}
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
              Sign Up
            </button>

            {/* رابط تسجيل الدخول */}
            <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
              Already have an account? <a href="/auth/register" style={{ color: "#328286", fontWeight: "600" }}>sign up</a>
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