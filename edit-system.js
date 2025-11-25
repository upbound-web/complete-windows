// Simple Content Management System for Complete Window Cleaning
// Allows inline editing of text and images

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
    // Make headings editable
    const editableSelectors = 'h1, h2, h3, p, li, span, a';
    document.querySelectorAll(editableSelectors).forEach((element, index) => {
        // Skip navigation and buttons
        if (element.closest('nav') || element.closest('button') || element.tagName === 'A') {
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
        element.style.outline = '1px dashed #34c759';
        element.style.cursor = 'text';
    });

    // Make images editable
    document.querySelectorAll('img').forEach((img, index) => {
        if (img.closest('nav')) return; // Skip logo

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.outline = '2px dashed #007aff';

        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        const changeBtn = document.createElement('button');
        changeBtn.innerHTML = '📷 Change Image';
        changeBtn.className = 'absolute top-2 right-2 px-3 py-1 bg-primary text-white text-sm font-semibold rounded shadow-lg hover:bg-primary-dark z-10';
        changeBtn.onclick = () => changeImage(img, index);

        wrapper.appendChild(changeBtn);
        img.dataset.editId = `image-${index}`;
    });
}

// Disable editing
function disableEditing() {
    document.querySelectorAll('[contenteditable="true"]').forEach(element => {
        element.removeAttribute('contenteditable');
        element.classList.remove('editable-element');
        element.style.outline = '';
        element.style.cursor = '';
    });

    // Remove image edit buttons and unwrap
    document.querySelectorAll('img').forEach(img => {
        const wrapper = img.parentElement;
        if (wrapper && wrapper.querySelector('button')) {
            const parent = wrapper.parentElement;
            parent.insertBefore(img, wrapper);
            parent.removeChild(wrapper);
        }
    });
}

// Change image
function changeImage(imgElement, index) {
    const newUrl = prompt('Enter new image URL:', imgElement.src);
    if (newUrl && newUrl.trim() !== '') {
        imgElement.src = newUrl;
        contentChanges[`image-${index}`] = newUrl;
    }
}

// Show edit controls
function showEditControls() {
    if (document.getElementById('edit-controls-panel')) return;

    const controlPanel = document.createElement('div');
    controlPanel.id = 'edit-controls-panel';
    controlPanel.className = 'fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-2xl border-2 border-primary z-50';
    controlPanel.innerHTML = `
        <h3 class="text-lg font-bold mb-3 text-gray-900">Edit Controls</h3>
        <div class="space-y-2">
            <button onclick="saveChanges()" class="w-full px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark">
                💾 Save Changes
            </button>
            <button onclick="downloadChanges()" class="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark">
                📥 Download Backup
            </button>
            <button onclick="loadChanges()" class="w-full px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700">
                📤 Load Backup
            </button>
            <p class="text-xs text-gray-500 mt-2">
                Click any text to edit. Click images to change them.
            </p>
        </div>
    `;
    document.body.appendChild(controlPanel);
}

// Hide edit controls
function hideEditControls() {
    const panel = document.getElementById('edit-controls-panel');
    if (panel) {
        panel.remove();
    }
}

// Save changes to localStorage
function saveChanges() {
    localStorage.setItem('siteContent', JSON.stringify(contentChanges));
    alert('✅ Changes saved successfully! Your edits are stored in the browser.');
    console.log('Saved changes:', contentChanges);
}

// Download changes as JSON file
function downloadChanges() {
    const dataStr = JSON.stringify(contentChanges, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website-changes-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();
    URL.revokeObjectURL(url);
    alert('✅ Backup file downloaded!');
}

// Load changes from file
function loadChanges() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const loadedChanges = JSON.parse(event.target.result);
                contentChanges = loadedChanges;
                applyChanges();
                alert('✅ Changes loaded successfully!');
            } catch (error) {
                alert('❌ Error loading file. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Apply loaded changes
function applyChanges() {
    Object.keys(contentChanges).forEach(editId => {
        const element = document.querySelector(`[data-edit-id="${editId}"]`);
        if (element) {
            if (element.tagName === 'IMG') {
                element.src = contentChanges[editId];
            } else {
                element.innerHTML = contentChanges[editId];
            }
        }
    });
}

// Auto-load changes on page load
window.addEventListener('load', () => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
        try {
            contentChanges = JSON.parse(savedContent);
            // Apply after a short delay to ensure elements exist
            setTimeout(applyChanges, 100);
        } catch (error) {
            console.error('Error loading saved content:', error);
        }
    }
});
