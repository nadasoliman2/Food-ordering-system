import React from 'react';
// استيراد الأيقونات المطلوبة
// FaTrashAlt for delete icon
// FaCcMastercard, FaPaypal for payment method icons
import { FaTrashAlt, FaCcMastercard, FaPaypal, FaPlus } from 'react-icons/fa'; 

// الألوان الأساسية
const COLORS = {
    primaryGreen: '#20c997', 
    lightGreen: '#e6fff7', 
    textColor: '#333',
    borderColor: '#eee',
    cardBg: '#f8f9fa', // لون خلفية البطاقة قريب من الأبيض
    deleteIconColor: '#dc3545', // أحمر للحذف
};

// بيانات طرق الدفع
const paymentMethods = [
    { id: 1, type: 'MasterCard', lastFour: '6568', expDate: '12/2024', icon: <FaCcMastercard /> },
    { id: 2, type: 'MasterCard', lastFour: '7111', expDate: '12/2024', icon: <FaCcMastercard /> },
    { id: 3, type: 'Paypal', lastFour: '', expDate: '12/2024', icon: <FaPaypal /> },
];

// كائنات التنسيق الرئيسية (Inline Styles)
const styles = {
    pageContainer: {
        backgroundColor: '#fff',
        padding: '30px', // إضافة مساحة بادئة للصفحة
    },
    paymentCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: '15px', // حواف أكثر استدارة
        padding: '',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)', // ظل خفيف
    },
    paymentIcon: {
        fontSize: '2.5rem', // حجم الأيقونة
        marginRight: '15px',
        color: COLORS.textColor, // لون افتراضي للأيقونات
    },
    paypalIcon: {
        fontSize: '2.5rem', 
        marginRight: '15px',
        color: '#0070ba', // لون بايبال الأزرق
    },
    cardDetails: {
        flexGrow: 1, // يأخذ المساحة المتبقية
    },
    cardNumber: {
        fontWeight: 'bold',
        fontSize: '1.1rem',
        marginBottom: '5px',
        color: COLORS.textColor,
    },
    expiryDate: {
        fontSize: '0.9rem',
        color: '#6c757d', // لون رمادي فاتح
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        color: COLORS.deleteIconColor,
        fontSize: '1.5rem', // حجم أيقونة الحذف
        cursor: 'pointer',
        padding: '0 10px', // مسافة حول الزر
    },
    addButton: {
        background: 'none',
        border: 'none',
        color: COLORS.primaryGreen,
        fontWeight: '600',
        paddingLeft: '0',
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px', // مسافة من الأعلى
    },
    addIcon: {
        marginRight: '8px',
        fontSize: '1.2rem',
    }
};

// مكون بطاقة طريقة الدفع الواحدة
const PaymentCard = ({ method }) => {
    const isPaypal = method.type === 'Paypal';
    return (
        <div style={styles.paymentCard}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={isPaypal ? styles.paypalIcon : styles.paymentIcon}>
                    {method.icon}
                </span>
                <div style={styles.cardDetails}>
                    <div style={styles.cardNumber}>
                        {method.type} {method.lastFour && method.lastFour}
                    </div>
                    <div style={styles.expiryDate}>
                        Exp {method.expDate}
                    </div>
                </div>
            </div>
            <button style={styles.deleteButton} title="Delete Payment Method">
                <FaTrashAlt />
            </button>
        </div>
    );
};

// المكون الرئيسي لصفحة طرق الدفع
export default function Payment() {
    return (
        <div style={styles.pageContainer}>
            <h2 className=" fw-bold">My Payment Methods</h2> 
            
            <div className="payment-methods-list">
                {paymentMethods.map(method => (
                    <PaymentCard key={method.id} method={method} />
                ))}
            </div>

            <button style={styles.addButton}>
                <FaPlus style={styles.addIcon} />
                Add Payment Method
            </button>
        </div>
    );
}