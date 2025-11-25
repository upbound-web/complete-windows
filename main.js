// ============================================
// PAGE SWITCHING FUNCTIONALITY
// ============================================

function showPage(pageId) {
    // Hide all pages
    document.getElementById('page-window-cleaning').classList.add('hidden');
    document.getElementById('page-solar-cleaning').classList.add('hidden');

    // Show selected page
    document.getElementById(pageId).classList.remove('hidden');

    // Update navigation active states
    const isWindowPage = pageId === 'page-window-cleaning';

    // Desktop nav
    const windowNav = document.getElementById('nav-window');
    const solarNav = document.getElementById('nav-solar');

    if (windowNav && solarNav) {
        if (isWindowPage) {
            windowNav.classList.add('text-primary', 'font-bold');
            windowNav.classList.remove('text-gray-600');
            solarNav.classList.remove('text-primary', 'font-bold');
            solarNav.classList.add('text-gray-600');
        } else {
            solarNav.classList.add('text-primary', 'font-bold');
            solarNav.classList.remove('text-gray-600');
            windowNav.classList.remove('text-primary', 'font-bold');
            windowNav.classList.add('text-gray-600');
        }
    }

    // Mobile nav
    const windowNavMobile = document.getElementById('nav-window-mobile');
    const solarNavMobile = document.getElementById('nav-solar-mobile');

    if (windowNavMobile && solarNavMobile) {
        if (isWindowPage) {
            windowNavMobile.classList.add('text-primary', 'font-bold');
            windowNavMobile.classList.remove('text-gray-600');
            solarNavMobile.classList.remove('text-primary', 'font-bold');
            solarNavMobile.classList.add('text-gray-600');
        } else {
            solarNavMobile.classList.add('text-primary', 'font-bold');
            solarNavMobile.classList.remove('text-gray-600');
            windowNavMobile.classList.remove('text-primary', 'font-bold');
            windowNavMobile.classList.add('text-gray-600');
        }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// FAQ TOGGLE FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');

            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.textContent = '−';
            } else {
                content.classList.add('hidden');
                icon.textContent = '+';
            }
        });
    });
});

// ============================================
// FORM HANDLING
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const formWindow = document.getElementById('form-window');

    if (formWindow) {
        formWindow.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Here you would normally send to a server
            console.log('Form submitted:', data);

            // Show success message
            alert('Thank you! We\'ll contact you within 1 hour with your free quote.');

            // Reset form
            this.reset();
        });
    }
});

// ============================================
// EDIT MODE SYSTEM
// ============================================

let editMode = false;
let contentChanges = {};

// Toggle Edit Mode
function toggleEditMode() {
    editMode = !editMode;
    const toggleBtn = document.getElementById('edit-mode-toggle');

    if (editMode) {
        toggleBtn.textContent = 'Edit Mode: ON';
        toggleBtn.classList.remove('bg-gray-800', 'hover:bg-gray-700');
        toggleBtn.classList.add('bg-green-600', 'hover:bg-green-700');
        enableEditing();
        showEditControls();
    } else {
        toggleBtn.textContent = 'Edit Mode: OFF';
        toggleBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        toggleBtn.classList.add('bg-gray-800', 'hover:bg-gray-700');
        disableEditing();
        hideEditControls();
    }
}

// Enable editing on text elements
function enableEditing() {
    // Make text elements editable
    const editableSelectors = 'h1, h2, h3, h4, p, li';
    const elements = document.querySelectorAll(editableSelectors);

    elements.forEach((element, index) => {
        // Skip navigation, buttons, and form elements
        if (element.closest('nav') || element.closest('button') || element.closest('form')) {
            return;
        }

        element.setAttribute('contenteditable', 'true');
        element.classList.add('editable-element');
        element.dataset.editId = `text-${index}`;

        // Save changes on blur
        element.addEventListener('blur', function() {
            const editId = this.dataset.editId;
            contentChanges[editId] = this.innerHTML;
        });

        // Add visual indicator
        element.style.outline = '2px dashed rgba(52, 199, 89, 0.5)';
        element.style.outlineOffset = '2px';
        element.style.cursor = 'text';
        element.title = 'Click to edit';
    });

    // Make images editable
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        // Skip logo
        if (img.closest('nav')) return;

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.width = '100%';

        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        img.style.outline = '2px dashed rgba(0, 122, 255, 0.5)';
        img.style.outlineOffset = '2px';

        const changeBtn = document.createElement('button');
        changeBtn.innerHTML = '📷 Change Image';
        changeBtn.className = 'absolute top-2 left-2 px-3 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-primary-dark z-10 transition-all';
        changeBtn.onclick = (e) => {
            e.preventDefault();
            changeImage(img, index);
        };

        wrapper.appendChild(changeBtn);
        img.dataset.editId = `image-${index}`;
    });

    console.log('✏️ Edit mode enabled. Click any text or image to edit.');
}

// Disable editing
function disableEditing() {
    // Remove contenteditable from text
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(element => {
        element.removeAttribute('contenteditable');
        element.classList.remove('editable-element');
        element.style.outline = '';
        element.style.outlineOffset = '';
        element.style.cursor = '';
        element.removeAttribute('title');
    });

    // Remove image edit buttons and unwrap
    const images = document.querySelectorAll('img[data-edit-id]');
    images.forEach(img => {
        img.style.outline = '';
        img.style.outlineOffset = '';

        const wrapper = img.parentElement;
        if (wrapper && wrapper.querySelector('button')) {
            const grandParent = wrapper.parentElement;
            grandParent.insertBefore(img, wrapper);
            grandParent.removeChild(wrapper);
        }
    });

    console.log('Edit mode disabled.');
}

// Change image
function changeImage(imgElement, index) {
    const currentSrc = imgElement.src;
    const newUrl = prompt('Enter new image URL or path:\n\n(You can use:\n- Full URL: https://example.com/image.jpg\n- Local path: public/my-image.jpg)', currentSrc);

    if (newUrl && newUrl.trim() !== '' && newUrl !== currentSrc) {
        imgElement.src = newUrl.trim();
        contentChanges[`image-${index}`] = newUrl.trim();
        console.log(`Image ${index} changed to: ${newUrl.trim()}`);
    }
}

// Show edit controls panel
function showEditControls() {
    if (document.getElementById('edit-controls-panel')) return;

    const controlPanel = document.createElement('div');
    controlPanel.id = 'edit-controls-panel';
    controlPanel.className = 'fixed bottom-6 right-6 bg-white p-6 rounded-xl shadow-2xl border-2 border-primary z-50 max-w-xs';
    controlPanel.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-900">✏️ Edit Controls</h3>
            <button onclick="toggleEditMode()" class="text-gray-500 hover:text-gray-700 text-xl font-bold">&times;</button>
        </div>
        <div class="space-y-2">
            <button onclick="saveChanges()" class="w-full px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-all">
                💾 Save Changes
            </button>
            <button onclick="downloadChanges()" class="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all">
                📥 Download Backup
            </button>
            <button onclick="loadChanges()" class="w-full px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all">
                📤 Load Backup
            </button>
            <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                <p class="text-xs text-gray-700 leading-relaxed">
                    <strong>How to use:</strong><br>
                    • Click text to edit<br>
                    • Click "Change Image" buttons<br>
                    • Save regularly!
                </p>
            </div>
        </div>
    `;
    document.body.appendChild(controlPanel);
}

// Hide edit controls panel
function hideEditControls() {
    const panel = document.getElementById('edit-controls-panel');
    if (panel) {
        panel.remove();
    }
}

// Save changes to localStorage
function saveChanges() {
    localStorage.setItem('siteContent', JSON.stringify(contentChanges));
    const count = Object.keys(contentChanges).length;
    alert(`✅ Changes saved successfully!\n\n${count} change(s) stored in browser memory.`);
    console.log('Saved changes:', contentChanges);
}

// Download changes as JSON file
function downloadChanges() {
    const dataStr = JSON.stringify(contentChanges, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    const filename = 'website-changes-' + new Date().toISOString().split('T')[0] + '.json';
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    alert(`✅ Backup file downloaded!\n\nFilename: ${filename}\n\nKeep this file safe - you can reload it anytime.`);
}

// Load changes from file
function loadChanges() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const loadedChanges = JSON.parse(event.target.result);
                contentChanges = loadedChanges;
                applyChanges();
                const count = Object.keys(contentChanges).length;
                alert(`✅ Changes loaded successfully!\n\n${count} change(s) restored.`);
            } catch (error) {
                alert('❌ Error loading file.\n\nPlease check that you selected a valid backup file.');
                console.error('Load error:', error);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Apply loaded changes to the page
function applyChanges() {
    let appliedCount = 0;

    Object.keys(contentChanges).forEach(editId => {
        const element = document.querySelector(`[data-edit-id="${editId}"]`);
        if (element) {
            if (element.tagName === 'IMG') {
                element.src = contentChanges[editId];
            } else {
                element.innerHTML = contentChanges[editId];
            }
            appliedCount++;
        }
    });

    console.log(`Applied ${appliedCount} changes to the page.`);
}

// Auto-load saved changes on page load
window.addEventListener('load', () => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
        try {
            contentChanges = JSON.parse(savedContent);
            // Apply after a short delay to ensure DOM is ready
            setTimeout(() => {
                applyChanges();
                console.log('✅ Previously saved changes loaded automatically.');
            }, 200);
        } catch (error) {
            console.error('Error loading saved content:', error);
        }
    }
});
