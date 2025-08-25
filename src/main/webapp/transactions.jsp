<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Transactions - AiB Banking</title>
        <link rel="stylesheet" href="css/transactions.css">
    </head>
    <body>
        <div class="app-container">
            <!-- Navigation -->
            <nav class="navbar">
                <div class="nav-brand">
                    <div class="brand-icon">?</div>
                    <div class="brand-text">
                        <div class="brand-name">AiB</div>
                        <div class="brand-subtitle">ALL IN BANKING</div>
                    </div>
                </div>
                <div class="nav-links">
                    <a href="dashboard.jsp" class="nav-link">Home</a>
                    <a href="transactions.jsp" class="nav-link active">Transactions</a>
                    <a href="prediction.jsp" class="nav-link">Projections</a>
                    <a href="aboutus.jsp" class="nav-link">About us</a>
                    <a href="index.jsp" class="nav-link">Logout</a>
                </div>
                <div class="nav-actions">
                    <button class="notification-btn">?</button>
                    <div class="profile-avatar">?</div>
                </div>
            </nav>

            <!-- Main Content -->
            <main class="main-content">
                <!-- Header Section -->
                <div class="page-header">
                    <h1>Transactions</h1>
                    <button class="add-transaction-btn" id="addTransactionBtn">
                        <span class="btn-icon">+</span>
                        Add Transaction
                    </button>
                </div>

                <!-- Filter Section -->
                <div class="filter-section">
                    <div class="filter-group">
                        <label for="filterType">Type:</label>
                        <select id="filterType">
                            <option value="all">All</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="filterCategory">Category:</label>
                        <select id="filterCategory">
                            <option value="all">All Categories</option>
                            <option value="food">Food & Dining</option>
                            <option value="transport">Transportation</option>
                            <option value="salary">Salary</option>
                            <option value="shopping">Shopping</option>
                            <option value="utilities">Utilities</option>
                            <option value="entertainment">Entertainment</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="filterDate">Date Range:</label>
                        <select id="filterDate">
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>
                    <button class="clear-filters-btn" id="clearFiltersBtn">Clear Filters</button>
                </div>

                <!-- Summary Cards -->
                <div class="summary-section">
                    <div class="summary-card income">
                        <div class="summary-icon">?</div>
                        <div class="summary-details">
                            <div class="summary-label">Total Income</div>
                            <div class="summary-amount" id="totalIncome">?0.00</div>
                        </div>
                    </div>
                    <div class="summary-card expense">
                        <div class="summary-icon">?</div>
                        <div class="summary-details">
                            <div class="summary-label">Total Expenses</div>
                            <div class="summary-amount" id="totalExpenses">?0.00</div>
                        </div>
                    </div>
                    <div class="summary-card balance">
                        <div class="summary-icon">?</div>
                        <div class="summary-details">
                            <div class="summary-label">Net Balance</div>
                            <div class="summary-amount" id="netBalance">?0.00</div>
                        </div>
                    </div>
                </div>

                <!-- Transactions List -->
                <div class="transactions-section">
                    <div class="section-header">
                        <h2>Recent Transactions</h2>
                        <div class="view-options">
                            <button class="view-btn active" data-view="list">?</button>
                            <button class="view-btn" data-view="grid">?</button>
                        </div>
                    </div>
                    <div class="transactions-container" id="transactionsContainer">
                        <!-- Transactions will be populated by JavaScript -->
                    </div>
                </div>
            </main>

            <!-- Add/Edit Transaction Modal -->
            <div class="modal-overlay" id="transactionModal">
                <div class="modal">
                    <div class="modal-header">
                        <h3 id="modalTitle">Add Transaction</h3>
                        <button class="modal-close" id="modalClose">×</button>
                    </div>
                    <form class="modal-body" id="transactionForm">
                        <div class="form-group">
                            <label for="transactionType">Type</label>
                            <select id="transactionType" required>
                                <option value="">Select Type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="transactionAmount">Amount</label>
                            <input type="number" id="transactionAmount" step="0.01" placeholder="0.00" required>
                        </div>
                        <div class="form-group">
                            <label for="transactionCategory">Category</label>
                            <select id="transactionCategory" required>
                                <option value="">Select Category</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="transactionDescription">Description</label>
                            <input type="text" id="transactionDescription" placeholder="Enter description" required>
                        </div>
                        <div class="form-group">
                            <label for="transactionDate">Date</label>
                            <input type="date" id="transactionDate" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
                            <button type="submit" class="btn btn-primary" id="saveBtn">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <script src="js/transactions.js"></script>
    </body>
</html>