document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals, {});

  const selects = document.querySelectorAll('select');
  M.FormSelect.init(selects, {});

  const sidenavs = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavs, {});

  const tabs = document.querySelector('.tabs');
  M.Tabs.init(tabs, {});
});
