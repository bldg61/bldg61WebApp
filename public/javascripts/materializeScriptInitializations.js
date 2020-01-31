document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals, {});
  const pushpins = document.querySelectorAll('.pushpin');
  M.Pushpin.init(pushpins, {});
  const tabs = document.querySelector('.tabs');
  M.Tabs.init(tabs, {});
  const selects = document.querySelectorAll('select');
  M.FormSelect.init(selects, {});
});
