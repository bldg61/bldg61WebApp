document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelector('.tabs');
  M.Tabs.init(tabs, {});
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals, {});
});
