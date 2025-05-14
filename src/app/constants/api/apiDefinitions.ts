export enum api{
    // Auth
    SYS_LOGIN = '/authentication/ClientsLogin',
    SYS_LOGOUT = '/authentication/Logout',
    SYS_REFRESH = '/authentication/Refresh',

    //SYS_OTHER_LIST_TYPE
    SYS_OTHER_LIST_TYPE_QUERY_LIST = '/SysOtherListType/QueryList',
    SYS_OTHER_LIST_TYPE_CREATE = '/SysOtherListType/Create',
    SYS_OTHER_LIST_TYPE_READ = '/SysOtherListType/GetById?id=',
    SYS_OTHER_LIST_TYPE_UPDATE = '/SysOtherListType/Update',
    SYS_OTHER_LIST_TYPE_DELETE_IDS = '/SysOtherListType/DeleteIds',
    SYS_OTHER_LIST_TYPE_GET_LIST = '/SysOtherListType/GetList',
    
    //SYS_OTHER_LIST
    SYS_OTHER_LIST_QUERY_LIST = '/SysOtherList/QueryList',
    SYS_OTHER_LIST_CREATE = '/SysOtherList/Create',
    SYS_OTHER_LIST_READ = '/SysOtherList/GetById?id=',
    SYS_OTHER_LIST_UPDATE = '/SysOtherList/Update',
    SYS_OTHER_LIST_DELETE_IDS = '/SysOtherList/DeleteIds',
    SYS_OTHER_LIST_EXPORT_EXCEL = '/SysOtherList/ExportExcelSysOtherList',
    SYS_OTHER_LIST_GET_LIST_BY_GROUP = '/SysOtherList/GetOtherListByGroup?code=',
    SYS_OTHER_LIST_GET_LIST_BY_CODE = '/SysOtherList/GetListByCode?typeCode=',
    SYS_OTHER_LIST_GET_LIST_BY_TYPE = '/SysOtherList/GetListByType?type=',
    SYS_OTHER_LIST_GET_ALL_USER = '/SysOtherList/GetAllUser',

    //SYS_USER
    SYS_USER_QUERY_LIST = '/SysUser/QueryList',
    SYS_USER_CREATE = '/SysUser/CreateUser',
    SYS_USER_UPDATE = '/SysUser/UpdateUser',
    SYS_USER_READ = '/SysUser/GetByIdString?id=',
    SYS_USER_DELETE_IDS = '/SysUser/DeleteIds',

    //SYS_MENU
    SYS_MENU_QUERY_LIST = '/SysMENU/QueryList',
    SYS_MENU_CREATE = '/SysMENU/Create',
    SYS_MENU_READ = '/SysMENU/GetById?id=',
    SYS_MENU_UPDATE = '/SysMENU/Update',
    SYS_MENU_DELETE_IDS = '/SysMENU/DeleteIds',
    SYS_MENU_GET_ACTION_BY_USER = '/SysMenu/GetActionByUser',
    SYS_MENU_GET_ALL_ACTION = '/SysMenu/GetAllAction',

    //PER_CUSTOMER
    PER_CUSTOMER_QUERY_LIST = '/PerCustomer/QueryList',
    PER_CUSTOMER_CREATE = '/PerCustomer/Create',
    PER_CUSTOMER_READ = '/PerCustomer/GetById?id=',
    PER_CUSTOMER_UPDATE = '/PerCustomer/Update',
    PER_CUSTOMER_GET_ALL = '/PerCustomer/GetAllCustomer',
    PER_CUSTOMER_DELETE_IDS = '/PerCustomer/DeleteIds',
    PER_CUSTOMER_TOGGLE_ACTIVE = '/PerCustomer/ToggleActiveIds',

    //PER_EMPLOYEE
    PER_EMPLOYEE_QUERY_LIST = '/PerEmployee/QueryList',
    PER_EMPLOYEE_CREATE = '/PerEmployee/Create',
    PER_EMPLOYEE_READ = '/PerEmployee/GetById?id=',
    PER_EMPLOYEE_UPDATE = '/PerEmployee/Update',
    PER_EMPLOYEE_DELETE_IDS = '/PerEmployee/DeleteIds',

    // GYM_PACKAGE 
    GYM_PACKAGE_QUERY_LIST = '/GymPackage/QueryList',
    GYM_PACKAGE_CREATE = '/GymPackage/Create',
    GYM_PACKAGE_READ = '/GymPackage/GetById?id=',
    GYM_PACKAGE_UPDATE = '/GymPackage/Update',
    GYM_PACKAGE_DELETE_IDS = '/GymPackage/DeleteIds',

    // GYM_SHIFT 
    GYM_SHIFT_QUERY_LIST = '/GymShift/QueryList',
    GYM_SHIFT_CREATE = '/GymShift/Create',
    GYM_SHIFT_READ = '/GymShift/GetById?id=',
    GYM_SHIFT_UPDATE = '/GymShift/Update',
    GYM_SHIFT_DELETE_IDS = '/GymShift/DeleteIds',
    GYM_SHIFT_GET_LIST = '/GymShift/GetList',

    //GOODS_LIST
    GOODS_LIST_QUERY_LIST = '/GoodsList/QueryList',
    GOODS_LIST_CREATE = '/GoodsList/Create',
    GOODS_LIST_READ = '/GoodsList/GetById?id=',
    GOODS_LIST_UPDATE = '/GoodsList/Update',
    GOODS_LIST_DELETE_IDS = '/GoodsList/DeleteIds',
    GOODS_LIST_GET_LIST = '/GoodsList/GetList',

    //CARD_CHECK_IN
    CARD_CHECK_IN_QUERY_LIST = '/CardCheckIn/QueryList',
    CARD_CHECK_IN_CREATE = '/CardCheckIn/Create',
    CARD_CHECK_IN_READ = '/CardCheckIn/GetById?id=',
    CARD_CHECK_IN_UPDATE = '/CardCheckIn/Update',
    CARD_CHECK_IN_CHECK_IN = '/CardCheckIn/CheckIn',
    CARD_CHECK_IN_DELETE_IDS = '/CardCheckIn/DeleteIds',
    CARD_CHECK_IN_TOGGLE_ACTIVE = '/CardCheckIn/ToggleActiveIds',
    CARD_CHECK_IN_GET_LIST_CARD_CODE = '/CardCheckIn/GetListCardCode',


    //CARD_INFO
    CARD_INFO_QUERY_LIST = '/CardInfo/QueryList',
    CARD_INFO_CREATE = '/CardInfo/Create',
    CARD_INFO_READ = '/CardInfo/GetById?id=',
    CARD_INFO_CALCULATE = '/CardInfo/CalculateByCardId?id=',
    CARD_INFO_UPDATE = '/CardInfo/Update',
    CARD_INFO_DELETE_IDS = '/CardInfo/DeleteIds',
    CARD_INFO_TOGGLE_ACTIVE = '/CardInfo/ToggleActiveIds',
    CARD_INFO_GET_ALL_CARD_VALID = '/CardInfo/GetAllCardValid',
    CARD_INFO_GET_LIST_CUSTOMER = '/CardInfo/GetListCustomer',    

    //CARD_HISTORY
    CARD_HISTORY_QUERY_LIST = '/CardHistory/QueryList',
    CARD_HISTORY_CREATE = '/CardHistory/Create',
    CARD_HISTORY_READ = '/CardHistory/GetById?id=',
    CARD_HISTORY_UPDATE = '/CardHistory/Update',
    CARD_HISTORY_DELETE_IDS = '/CardHistory/DeleteIds',
    CARD_HISTORY_TOGGLE_ACTIVE = '/CardHistory/ToggleActiveIds',
    CARD_HISTORY_GET_LIST_CARD_CODE = '/CardHistory/GetListCardCode',

    // GOODS_EQUIPMENT
    GOODS_EQUIPMENT_QUERY_LIST = '/GoodsEquipment/QueryList',
    GOODS_EQUIPMENT_CREATE = '/GoodsEquipment/Create',
    GOODS_EQUIPMENT_READ = '/GoodsEquipment/GetById?id=',
    GOODS_EQUIPMENT_UPDATE = '/GoodsEquipment/Update',
    GOODS_EQUIPMENT_DELETE_IDS = '/GoodsEquipment/DeleteIds',
    GOODS_EQUIPMENT_GET_LIST = '/GoodsEquipment/GetList',
    GOODS_EQUIPMENT_GET_LIST_BY_TYPE_CODE = '/GoodsEquipment/GetListByTypeCode?typeCode=',
    GOODS_EQUIPMENT_GET_LIST_BY_TYPE_ID = '/GoodsEquipment/GetListByTypeId?id=',

    // GOODS_EQUIPMENT_FIX
    GOODS_EQUIPMENT_FIX_QUERY_LIST = '/GoodsEquipmentFix/QueryList',
    GOODS_EQUIPMENT_FIX_CREATE = '/GoodsEquipmentFix/Create',
    GOODS_EQUIPMENT_FIX_READ = '/GoodsEquipmentFix/GetById?id=',
    GOODS_EQUIPMENT_FIX_UPDATE = '/GoodsEquipmentFix/Update',
    GOODS_EQUIPMENT_FIX_DELETE_IDS = '/GoodsEquipmentFix/DeleteIds',
    GOODS_EQUIPMENT_FIX_GET_LIST = '/GoodsEquipmentFix/GetList',

    //PER_CUSTOMER
    PER_CUSTOMER_TRANSACTIONS_QUERY_LIST = '/PerCusTransaction/QueryList',
    PER_CUSTOMER_TRANSACTIONS_CREATE = '/PerCusTransaction/Create',
    PER_CUSTOMER_TRANSACTIONS_READ = '/PerCusTransaction/GetById?id=',
    PER_CUSTOMER_TRANSACTIONS_UPDATE = '/PerCusTransaction/Update',
    PER_CUSTOMER_TRANSACTIONS_DELETE_IDS = '/PerCusTransaction/DeleteIds',
    PER_CUSTOMER_TRANSACTIONS_TOGGLE_ACTIVE = '/PerCusTransaction/ToggleActiveIds',

    //GOODS_LOCKER
    GOODS_LOCKER_QUERY_LIST = '/GoodsLocker/QueryList',
    GOODS_LOCKER_CREATE = '/GoodsLocker/Create',
    GOODS_LOCKER_READ = '/GoodsLocker/GetById?id=',
    GOODS_LOCKER_UPDATE = '/GoodsLocker/Update',
    GOODS_LOCKER_DELETE_IDS = '/GoodsLocker/DeleteIds',
    GOODS_LOCKER_TOGGLE_ACTIVE = '/GoodsLocker/ToggleActiveIds',
    GOODS_LOCKER_GET_ALL_LOCKER_VALID = '/GoodsLocker/GetAllLockerValid',
    GOODS_LOCKER_GET_STATUS = '/GoodsLocker/GetLockerStatus?area=',

    //PER_CUSTOMER
    CARD_ISSUANCE_QUERY_LIST = '/CardIssuance/QueryList',
    CARD_ISSUANCE_CREATE = '/CardIssuance/Create',
    CARD_ISSUANCE_READ = '/CardIssuance/GetById?id=',
    CARD_ISSUANCE_UPDATE = '/CardIssuance/Update',
    CARD_ISSUANCE_DELETE_IDS = '/CardIssuance/DeleteIds',
    CARD_ISSUANCE_TOGGLE_ACTIVE = '/CardIssuance/ToggleActiveIds',


    // REPORT
    EXPORT_REPORT_EXCEL = '/Report/GetReport',

    // GOODS_DISCOUNT_VOUCHER
    GOODS_DISCOUNT_VOUCHER_QUERY_LIST = '/GoodsDiscountVoucher/QueryList',
    GOODS_DISCOUNT_VOUCHER_CREATE = '/GoodsDiscountVoucher/Create',
    GOODS_DISCOUNT_VOUCHER_READ = '/GoodsDiscountVoucher/GetById?id=',
    GOODS_DISCOUNT_VOUCHER_UPDATE = '/GoodsDiscountVoucher/Update',
    GOODS_DISCOUNT_VOUCHER_DELETE_IDS = '/GoodsDiscountVoucher/DeleteIds',
    GOODS_DISCOUNT_VOUCHER_GET_LIST = '/GoodsDiscountVoucher/GetList',

    // GOODS_DISCOUNT_VOUCHER
    ORD_BILL_QUERY_LIST = '/OrdBill/QueryList',
    ORD_BILL_READ = '/OrdBill/GetById?id=',
    ORD_BILL_PRINT = '/OrdBill/PrintBills',
}