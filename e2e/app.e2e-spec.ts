import { SupportHelpdeskAgAppPage } from './app.po';

describe('support-helpdesk-ag-app App', () => {
  let page: SupportHelpdeskAgAppPage;

  beforeEach(() => {
    page = new SupportHelpdeskAgAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
