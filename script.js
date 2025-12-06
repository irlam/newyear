// Minimal JavaScript for interactive forms and UX enhancements
// Handles edit toggles, form submissions, and delete confirmations

document.addEventListener('DOMContentLoaded', function() {
    // Toggle edit forms
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
