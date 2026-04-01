
const transactions = [
    {
        transaction_id: "1",
        transaction_date: "2019-01-01",
        transaction_amount: 100.0,
        transaction_type: "debit",
        transaction_description: "Payment for groceries",
        merchant_name: "SuperMart",
        card_type: "Visa",
    },
    {
        transaction_id: "2",
        transaction_date: "2019-01-02",
        transaction_amount: 50.0,
        transaction_type: "credit",
        transaction_description: "Refund for returned item",
        merchant_name: "OnlineShop",
        card_type: "MasterCard",
    },
    {
        transaction_id: "3",
        transaction_date: "2019-01-03",
        transaction_amount: 75.0,
        transaction_type: "debit",
        transaction_description: "Dinner with friends",
        merchant_name: "RestaurantABC",
        card_type: "Amex",
    },
    {
        transaction_id: "4",
        transaction_date: "2019-02-04", 
        transaction_amount: 120.0,
        transaction_type: "debit",
        transaction_description: "Shopping at Mall",
        merchant_name: "FashionStoreXYZ",
        card_type: "Discover",
    }
];


// 1. Уникальные типы транзакций
const getUniqueTransactionTypes = (transactions) => {
    return Array.from(new Set(transactions.map(t => t.transaction_type)));   //new Set() — это структура данных, которая хранит только уникальные значения (без повторений).
};

// 2. Сумма всех транзакций
const calculateTotalAmount = (transactions) => {
    return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);   // reduce суммирует
};

// 3. Сумма по дате (год, месяц, день) [extra]
const calculateTotalAmountByDate = (transactions, year, month, day) => {
    return transactions
        .filter(t => {                                                      //filter - перебирает элементы и оставляет только те, которые проходят условие
            const date = new Date(t.transaction_date);
            const matchYear = year ? date.getFullYear() === year : true;
            const matchMonth = month ? (date.getMonth() + 1) === month : true;
            const matchDay = day ? date.getDate() === day : true;
            return matchYear && matchMonth && matchDay;
        })
        .reduce((sum, t) => sum + t.transaction_amount, 0);   // reduce суммирует
};

// 4. Транзакции по типу
const getTransactionByType = (transactions, type) => {
    return transactions.filter(t => t.transaction_type === type);   
};

// 5. Транзакции в диапазоне дат
const getTransactionsInDateRange = (transactions, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(t => {
        const d = new Date(t.transaction_date);
        return d >= start && d <= end;
    });
};

// 6. Транзакции по магазину
const getTransactionsByMerchant = (transactions, merchantName) => {
    return transactions.filter(t => t.merchant_name === merchantName);
};

// 7. Средняя сумма транзакции
const calculateAverageTransactionAmount = (transactions) => {
    if (transactions.length === 0) return 0;
    return calculateTotalAmount(transactions) / transactions.length;
};

// 8. Транзакции по диапазону суммы
const getTransactionsByAmountRange = (transactions, minAmount, maxAmount) => {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
};

// 9. Общая сумма дебетовых транзакций
const calculateTotalDebitAmount = (transactions) => {
    return transactions
        .filter(t => t.transaction_type === 'debit')
        .reduce((sum, t) => sum + t.transaction_amount, 0);    // reduce суммирует
};

// 10. Месяц с наибольшим количеством транзакций
const findMostTransactionsMonth = (transactions) => {
    const monthsCount = {};
    transactions.forEach(t => {
        const month = t.transaction_date.substring(0, 7); // формат YYYY-MM
        monthsCount[month] = (monthsCount[month] || 0) + 1;
    });
    return Object.keys(monthsCount).reduce((a, b) => monthsCount[a] > monthsCount[b] ? a : b, "N/A");
};

// 11. Месяц с наибольшим количеством дебетовых транзакций
const findMostDebitTransactionMonth = (transactions) => {
    const debits = transactions.filter(t => t.transaction_type === 'debit');
    return findMostTransactionsMonth(debits);
};

// 12. Каких транзакций больше
const mostTransactionTypes = (transactions) => {
    const debitCount = getTransactionByType(transactions, 'debit').length;
    const creditCount = getTransactionByType(transactions, 'credit').length;
    if (debitCount > creditCount) return 'debit';
    if (creditCount > debitCount) return 'credit';
    return 'equal';
};

// 13. Транзакции до указанной даты
const getTransactionsBeforeDate = (transactions, date) => {
    const targetDate = new Date(date);
    return transactions.filter(t => new Date(t.transaction_date) < targetDate);
};

// 14. Поиск транзакции по ID
const findTransactionById = (transactions, id) => {
    return transactions.find(t => t.transaction_id === id);
};
 // find возвращает ПЕРВЫЙ найденный элемент (в отличие от filter)

// 15. Массив описаний
const mapTransactionDescriptions = (transactions) => {
    return transactions.map(t => t.transaction_description);     // map создаёт новый массив, преобразуя каждый элемент
};

/**
 * Шаг 3. Тестирование функций
 */

console.log("Основной массив:");
console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма:", calculateTotalAmount(transactions));
console.log("Сумма за 2019-01:", calculateTotalAmountByDate(transactions, 2019, 1));
console.log("Дебетовые транзакции:", getTransactionByType(transactions, 'debit').length);
console.log("Средний чек:", calculateAverageTransactionAmount(transactions).toFixed(2));
console.log("Каких транзакций больше?:", mostTransactionTypes(transactions));
console.log("Месяц с макс. транзакций:", findMostTransactionsMonth(transactions));
console.log("Все описания:", mapTransactionDescriptions(transactions));

console.log("\nПустой массив [extra]:");
const emptyArr = [];
console.log("Сумма пустого:", calculateTotalAmount(emptyArr));
console.log("Среднее пустого:", calculateAverageTransactionAmount(emptyArr));
console.log("Тип большинства (пусто):", mostTransactionTypes(emptyArr));

console.log("\nОдна транзакция [extra]:");
const singleArr = [transactions[0]];
console.log("ID найденной:", findTransactionById(singleArr, "1")?.transaction_id);
console.log("Месяц макс. транзакций (1 шт):", findMostTransactionsMonth(singleArr));