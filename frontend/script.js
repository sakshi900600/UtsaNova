const API_URL = '/api/feedback'; // for vercel
// const API_URL = 'http://localhost:5000/api/feedback'; // for local

console.log('=== DEBUG INFO ===');
console.log('API URL:', API_URL);
console.log('=== END DEBUG ===');

// Load all feedback on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, starting...');
    loadFeedback();
    
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', submitFeedback);
    }
});

// Load all feedback entries
async function loadFeedback() {
    try {
        console.log('FETCHING from:', API_URL);
        
        const response = await fetch(API_URL);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data received:', data);
        
        if (data.success) {
            displayFeedback(data.data);
        } else {
            showError('Failed to load feedback');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('feedbackList').innerHTML = `
            <div class="no-feedback" style="color: red;">
                ⚠️ Error: ${error.message}<br>
                Backend URL: ${API_URL}
            </div>
        `;
    }
}

// Submit new feedback
async function submitFeedback(e) {
    e.preventDefault();
    
    clearErrors();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    if (name.length < 2) {
        showFieldError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (message.length < 10) {
        showFieldError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (!isValid) return;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Feedback submitted successfully!');
            document.getElementById('feedbackForm').reset();
            loadFeedback();
        } else {
            showError(data.error || 'Failed to submit feedback');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Network error. Make sure backend is running on port 5000');
    }
}

// Delete feedback
async function deleteFeedback(id) {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Feedback deleted successfully!');
            loadFeedback();
        } else {
            showError('Failed to delete feedback');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Network error');
    }
}

// Toggle review status
async function toggleReview(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Review status updated!');
            loadFeedback();
        } else {
            showError('Failed to update review status');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Network error');
    }
}

function clearErrors() {
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    const msg = document.getElementById('formMessage');
    if (msg) {
        msg.className = 'form-message';
        msg.textContent = '';
    }
}

function showFieldError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function showSuccess(message) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.className = 'form-message success';
    messageDiv.textContent = message;
    setTimeout(() => {
        messageDiv.className = 'form-message';
        messageDiv.textContent = '';
    }, 3000);
}

function showError(message) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.className = 'form-message error';
    messageDiv.textContent = message;
    setTimeout(() => {
        messageDiv.className = 'form-message';
        messageDiv.textContent = '';
    }, 5000);
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function displayFeedback(feedbacks) {
    const feedbackList = document.getElementById('feedbackList');
    
    if (!feedbacks || feedbacks.length === 0) {
        feedbackList.innerHTML = '<div class="no-feedback">No feedback entries yet. Be the first to submit!</div>';
        return;
    }
    
    feedbackList.innerHTML = feedbacks.map(feedback => `
        <div class="feedback-item" data-id="${feedback._id}">
            <div class="feedback-header">
                <div>
                    <span class="feedback-name">${escapeHtml(feedback.name)}</span>
                    <span class="feedback-email">(${escapeHtml(feedback.email)})</span>
                </div>
                <span class="review-badge ${feedback.reviewed ? 'reviewed' : 'not-reviewed'}">
                    ${feedback.reviewed ? '✓ Reviewed' : '⏳ Pending'}
                </span>
            </div>
            <div class="feedback-message">${escapeHtml(feedback.message)}</div>
            <div class="feedback-date">
                ${new Date(feedback.createdAt).toLocaleString()}
            </div>
            <div class="feedback-actions">
                <button onclick="toggleReview('${feedback._id}')" class="btn btn-review">
                    ${feedback.reviewed ? 'Mark as Unreviewed' : 'Mark as Reviewed'}
                </button>
                <button onclick="deleteFeedback('${feedback._id}')" class="btn btn-danger">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}