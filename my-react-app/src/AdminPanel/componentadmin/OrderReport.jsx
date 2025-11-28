import React, { useState } from 'react'; // 1. استيراد useState
// ... (بقية استيرادات الأيقونات)
import {
    Search,
    Filter,
    MoreVertical,
    CheckCircle,
    Clock,
    XCircle,
    Truck,
    XOctagon,
} from 'lucide-react';

// --- البيانات التجريبية (Mock Data) ---
const mockOrders = [
    {no: 1, orderId: '#ORD0001', product: 'Spanish Latte Medium', date: '01-01-2025', price: 49.99, payment: 'Paid', status: 'Delivered', image: 'latte.png'},
    {no: 2, orderId: '#ORD0002', product: 'Seafood Pizza', date: '01-01-2025', price: 14.99, payment: 'Unpaid', status: 'Pending', image: 'pizza.png'},
    {no: 3, orderId: '#ORD0003', product: 'Spaghetti Large Dish', date: '01-01-2025', price: 49.99, payment: 'Paid', status: 'Delivered', image: 'spaghetti.png'},
    {no: 4, orderId: '#ORD0004', product: 'Spanish Latte Medium', date: '01-01-2025', price: 49.99, payment: 'Paid', status: 'Delivered', image: 'latte.png'},
    {no: 5, orderId: '#ORD0005', product: 'Honey Pancake', date: '01-01-2025', price: 79.99, payment: 'Unpaid', status: 'Cancelled', image: 'pancake.png'},
    {no: 6, orderId: '#ORD0006', product: 'Cheese Burger', date: '02-01-2025', price: 35.00, payment: 'Paid', status: 'Pending', image: 'burger.png'},
    // ... يفضل تغيير رقم الـ Order ID لبعض الطلبات لاختبار البحث بشكل أفضل
];

// --- مكونات مساعدة (StatusPill و getStatusData تبقى كما هي) ---
// ... (الكود الخاص بـ getStatusData و StatusPill)
const getStatusData = (status, type) => {
    // ... (الكود لم يتغير)
    if (type === 'payment') {
        if (status === 'Paid') {
            return { colorClass: 'text-success border-success-subtle', icon: CheckCircle, text: 'Paid' };
        } else {
            return { colorClass: 'text-danger border-danger-subtle', icon: XCircle, text: 'Unpaid' };
        }
    } else { // type === 'order'
        switch (status) {
            case 'Delivered':
                return { icon: Truck, colorClass: 'text-success border-success-subtle', text: 'Delivered' };
            case 'Pending':
                return { icon: Clock, colorClass: 'text-warning border-warning-subtle', text: 'Pending' };
            case 'Cancelled':
                return { icon: XOctagon, colorClass: 'text-danger border-danger-subtle', text: 'Cancelled' };
            default:
                return { icon: Clock, colorClass: 'text-secondary border-secondary-subtle', text: 'Processing' };
        }
    }
};

const StatusPill = ({ value, type }) => {
    const statusData = getStatusData(value, type);
    const Icon = statusData.icon;

    return (
        <span className={`d-inline-flex align-items-center justify-content-center px-3 py-1 rounded-pill fw-semibold ${statusData.colorClass}`} 
              style={{ fontSize: '0.8rem', backgroundColor: `${statusData.colorClass.replace('text-', '').replace(' border-','-subtle').split(' ')[0]}-subtle`}}>
            <Icon size={14} className="me-1" />
            {statusData.text}
        </span>
    );
};


// --- المكون الرئيسي مع وظيفة البحث ---

export default function OrderReport() {
    const totalOrders = 240;
    // 2. تعريف حالة البحث
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { name: 'All', count: totalOrders, active: true, bsClass: '' },
        { name: 'Completed', count: null, active: false, bsClass: 'btn-light' },
        { name: 'Pending', count: null, active: false, bsClass: 'btn-light' },
        { name: 'Canceled', count: null, active: false, bsClass: 'btn-light' },
    ];

    // 3. دالة تصفية الطلبات
    const filteredOrders = mockOrders.filter(order => {
        // إذا كان حقل البحث فارغاً، نعرض جميع الطلبات
        if (!searchQuery) return true;

        // تحويل مدخلات البحث والنص المراد البحث فيه إلى حروف صغيرة
        const query = searchQuery.toLowerCase();
        
        // البحث برقم الطلب أو اسم المنتج
        const orderIdMatch = order.orderId.toLowerCase().includes(query);
        const productMatch = order.product.toLowerCase().includes(query);

        return orderIdMatch || productMatch;
    });

    return (
        <div className="container py-4" style={{marginTop:"90px"}}>
            <div className="card shadow-sm border-0">
                <div className="card-body p-4">

                    {/* شريط الأدوات العلوي */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center pb-3 mb-3 border-bottom border-light">
                        
                        {/* الألسنة (Tabs) */}
                        <div className="d-flex flex-wrap gap-2 mb-3 mb-md-0">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    className={`btn ${tab.active ? 'fw-semibold' : 'btn-light text-secondary'}`}
                                    style={{ 
                                        borderRadius: '0.5rem',
                                        backgroundColor: tab.active ? '#87A5A6' : undefined,
                                        borderColor: tab.active ? '#87A5A6' : undefined,
                                        color: tab.active ? 'white' : undefined,
                                    }} 
                                >
                                    {tab.name} {tab.count && `(${tab.count})`}
                                </button>
                            ))}
                        </div>

                        {/* شريط البحث والفلاتر */}
                        <div className="d-flex align-items-center gap-2">
                            
                            {/* حقل البحث */}
                            <div className="input-group" style={{ width: '250px' }}>
                                <span className="input-group-text bg-white border-end-0">
                                    <Search size={16} color="#6c757d" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0"
                                    placeholder="Search order report"
                                    // ربط قيمة الإدخال بحالة البحث
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* زر الفلترة */}
                            <button className="btn btn-outline-secondary p-2 d-flex align-items-center">
                                <Filter size={20} />
                            </button>

                            {/* قائمة الإجراءات الإضافية */}
                            <button className="btn btn-outline-secondary p-2 d-flex align-items-center">
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    </div>
                    
                    {/* الجدول */}
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            
                            {/* رأس الجدول... (لم يتغير) */}
                            <thead className="bg-light">
                                <tr>
                                    <th className="py-3">
                                        <input type="checkbox" className="form-check-input" />
                                    </th>
                                    <th className="py-3 text-muted" style={{ width: '50px' }}>No.</th>
                                    <th className="py-3 text-muted">Order Id</th>
                                    <th className="py-3 text-muted">Product</th>
                                    <th className="py-3 text-muted">Date</th>
                                    <th className="py-3 text-muted">Price</th>
                                    <th className="py-3 text-center text-muted">Payment</th>
                                    <th className="py-3 text-center text-muted">Status</th>
                                </tr>
                            </thead>
                            
                            {/* جسم الجدول: استخدام filteredOrders بدلاً من mockOrders */}
                            <tbody>
                                {filteredOrders.map((order, index) => ( // تم التغيير هنا
                                    <tr key={index}>
                                        <td>
                                            <input type="checkbox" className="form-check-input" />
                                        </td>
                                        <td className="text-secondary">{order.no}</td>
                                        <td className="fw-bold">{order.orderId}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                {/* Placeholder للصورة */}
                                                <div className="bg-light p-2 rounded-circle me-3" style={{ width: '40px', height: '40px' }}>
                                                    
                                                </div>
                                                <span className="fw-medium">{order.product}</span>
                                            </div>
                                        </td>
                                        <td className="text-secondary">{order.date}</td>
                                        <td className="fw-bold text-dark">${order.price.toFixed(2)}</td>
                                        <td className="text-center">
                                            <StatusPill value={order.payment} type="payment" />
                                        </td>
                                        <td className="text-center">
                                            <StatusPill value={order.status} type="order" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* التذييل */}
                    <div className="mt-4 d-flex justify-content-between align-items-center text-muted small">
                        <p className="mb-0">Showing 1 to {filteredOrders.length} of {totalOrders} results</p>
                    </div>
                </div>
            </div>
        </div>
    );
}