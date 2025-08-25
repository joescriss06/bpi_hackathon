// Transaction Management System
class TransactionManager {
    constructor() {
        this.transactions = [];
        this.editingId = null;
        this.currentFilter = {
            type: 'all',
            category: 'all',
            date: 'all'
        };
        
        this.categoryMap = {
            food: { name: 'Food & Dining', icon: '🍽️' },
            transport: { name: 'Transportation', icon: '🚗' },
            salary: { name: 'Salary', icon: '💼' },
            shopping: { name: 'Shopping', icon: '🛒' },
            utilities: { name: 'Utilities', icon: '⚡' },
            entertainment: { name: 'Entertainment', icon: '🎬' }
        };
        
        this.init();
        this.loadSampleData();
    }
    
    init() {
        this.bindEvents();
        this.updateCategoryOptions();
        this.setDefaultDate();
    }
    
    bindEvents() {
        // Modal events
        document.getElementById('addTransactionBtn').addEventListener('click', () => this.openModal());
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('transactionForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Filter events
        document.getElementById('filterType').addEventListener('change', (e) => this.applyFilter('type', e.target.value));
        document.getElementById('filterCategory').addEventListener('change', (e) => this.applyFilter('category', e.target.value));
        document.getElementById('filterDate').addEventListener('change', (e) => this.applyFilter('date', e.target.value));
        document.getElementById('clearFiltersBtn').addEventListener('click', () => this.clearFilters());
        
        // View toggle events
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleView(e.target.dataset.view));
        });
        
        // Transaction type change
        document.getElementById('transactionType').addEventListener('change', () => this.updateCategoryOptions());
        
        // Modal overlay click
        document.getElementById('transactionModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('transactionModal')) {
                this.closeModal();
            }
        });
    }
    
    loadSampleData() {
        const sampleTransactions = [
            {
                id: 1,
                type: 'expense',
                amount: 215.30,
                category: 'transport',
                description: 'Mobile Top-up',
                date: new Date().toISOString().split('T')[0],
                time: '2:30 PM'
            },
            {
                id: 2,
                type: 'expense',
                amount: 352.99,
                category: 'food',
                description: 'Food Delivery',
                date: new Date().toISOString().split('T')[0],
                time: '12:15 PM'
            },
            {
                id: 3,
                type: 'income',
                amount: 25000.00,
                category: 'salary',
                description: 'Salary Deposit',
                date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
                time: '9:00 AM'
            },
            {
                id: 4,
                type: 'expense',
                amount: 1250.00,
                category: 'shopping',
                description: 'Online Shopping',
                date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
                time: '3:45 PM'
            },
            {
                id: 5,
                type: 'expense',
                amount: 890.50,
                category: 'utilities',
                description: 'Electricity Bill',
                date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
                time: '11:20 AM'
            }
        ];
        
        this.transactions = sampleTransactions;
        this.renderTransactions();
        this.updateSummary();
    }
    
    openModal(transaction = null) {
        const modal = document.getElementById('transactionModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('transactionForm');
        
        if (transaction) {
            this.editingId = transaction.id;
            modalTitle.textContent = 'Edit Transaction';
            this.populateForm(transaction);
        } else {
            this.editingId = null;
            modalTitle.textContent = 'Add Transaction';
            form.reset();
            this.setDefaultDate();
        }
        
        modal.classList.add('show');
        this.updateCategoryOptions();
    }
    
    closeModal() {
        const modal = document.getElementById('transactionModal');
        modal.classList.remove('show');
        this.editingId = null;
        document.getElementById('transactionForm').reset();
    }
    
    populateForm(transaction) {
        document.getElementById('transactionType').value = transaction.type;
        document.getElementById('transactionAmount').value = transaction.amount;
        document.getElementById('transactionCategory').value = transaction.category;
        document.getElementById('transactionDescription').value = transaction.description;
        document.getElementById('transactionDate').value = transaction.date;
    }
    
    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('transactionDate').value = today;
    }
    
    updateCategoryOptions() {
        const categorySelect = document.getElementById('transactionCategory');
        const type = document.getElementById('transactionType').value;
        
        // Clear existing options except the first one
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        
        let categories;
        if (type === 'income') {
            categories = ['salary'];
        } else if (type === 'expense') {
            categories = ['food', 'transport', 'shopping', 'utilities', 'entertainment'];
        } else {
            categories = Object.keys(this.categoryMap);
        }
        
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = this.categoryMap[cat].name;
            categorySelect.appendChild(option);
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            type: document.getElementById('transactionType').value,
            amount: parseFloat(document.getElementById('transactionAmount').value),
            category: document.getElementById('transactionCategory').value,
            description: document.getElementById('transactionDescription').value,
            date: document.getElementById('transactionDate').value,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };