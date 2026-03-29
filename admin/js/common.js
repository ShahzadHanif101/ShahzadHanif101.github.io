// Highlight current page in sidebar
function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar-item').forEach(el => {
    const link = el.getAttribute('href');
    if (link === currentPage) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

// Generic modal handling
let activeModalCallback = null;

function openModal(contentHtml, onConfirmCallback = null) {
  const modalRoot = document.getElementById('modalRoot');
  if (!modalRoot) return;
  const modalContentDiv = document.getElementById('modalContent');
  modalContentDiv.innerHTML = contentHtml;
  modalRoot.classList.remove('hidden');
  activeModalCallback = onConfirmCallback;

  const closeModal = () => {
    modalRoot.classList.add('hidden');
    modalRoot.innerHTML = '<div id="modalContent" class="bg-[#11141f] rounded-2xl w-full max-w-md border border-gray-700"></div>';
    activeModalCallback = null;
  };

  const closeBtn = modalRoot.querySelector('.close-modal-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  const cancelBtn = modalRoot.querySelector('.cancel-modal-btn');
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  const confirmBtn = modalRoot.querySelector('.confirm-modal-btn');
  if (confirmBtn && onConfirmCallback) confirmBtn.addEventListener('click', () => { onConfirmCallback(); closeModal(); });
}

function closeModal() {
  const modalRoot = document.getElementById('modalRoot');
  if (modalRoot) modalRoot.classList.add('hidden');
}