document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelector('.tabs');
  M.Tabs.init(tabs, {});
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals, {});
  const selects = document.querySelectorAll('select');
  M.FormSelect.init(selects, {});
});
