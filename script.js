// Minimal JavaScript for interactive forms and UX enhancements
// Handles edit toggles, form submissions, and delete confirmations

document.addEventListener('DOMContentLoaded', function() {
    // Toggle edit forms for sections
    document.querySelectorAll('.edit-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const form = card.querySelector('.edit-form');
            
            if (form.classList.contains('active')) {
                form.classList.remove('active');
                this.textContent = 'Edit';
            } else {
                form.classList.add('active');
                this.textContent = 'Cancel';
            }
        });
    });
    
    // Toggle edit forms for list items
    document.querySelectorAll('.edit-item-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const listItem = this.closest('.list-item');
            const form = listItem.querySelector('.edit-item-form');
            
            if (form.classList.contains('active')) {
                form.classList.remove('active');
                this.textContent = 'Edit';
            } else {
                form.classList.add('active');
                this.textContent = 'Cancel';
            }
        });
    });
    
    // Cancel edit for list items
    document.querySelectorAll('.cancel-edit').forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('.edit-item-form');
            const toggleButton = form.closest('.list-item').querySelector('.edit-item-toggle');
            form.classList.remove('active');
            if (toggleButton) {
                toggleButton.textContent = 'Edit';
            }
        });
    });
    
    // Confirm delete for list items
    document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this item?')) {
                e.preventDefault();
            }
        });
    });
    
    // Auto-hide success messages after 3 seconds
    const successMessages = document.querySelectorAll('.success');
    successMessages.forEach(msg => {
        setTimeout(() => {
            msg.style.transition = 'opacity 0.5s';
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 500);
        }, 3000);
    });
});
