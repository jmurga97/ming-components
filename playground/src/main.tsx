import { StrictMode, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import {
  AppShell,
  Badge,
  Button,
  Checkbox,
  ConfirmAction,
  DropdownMenu,
  Field,
  InlineMessage,
  Input,
  MediaBrowser,
  OverviewPanel,
  ResourceTable,
  Select,
  SidebarNav,
  StatusText,
  Switch,
  TagList,
  TagPicker,
  Textarea,
} from '@ming/components';
import '../../src/styles.css';
import './playground.css';

const TAG_OPTIONS = [
  { id: 'editorial', label: 'Editorial' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'still-life', label: 'Still life' },
];

function Playground(): React.JSX.Element {
  const [navigationOpen, setNavigationOpen] = useState(true);
  const [section, setSection] = useState('form');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [restaurant, setRestaurant] = useState('Casa Ming');
  const [language, setLanguage] = useState<string | null>('es');
  const [published, setPublished] = useState(true);
  const [tags, setTags] = useState<string[]>(['portrait']);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [removed, setRemoved] = useState(false);
  const confirmTriggerRef = useRef<HTMLButtonElement>(null);

  function applyTheme(nextTheme: 'dark' | 'light'): void {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(nextTheme);
    setTheme(nextTheme);
  }

  const navigation = (
    <SidebarNav
      footer={
        <StatusText tone="success">
          <span aria-hidden="true" className="playground-status-dot" /> Service online
        </StatusText>
      }
      header={
        <div className="playground-identity">
          <span>Ming / Quiet operations</span>
          <strong>Casa Ming</strong>
        </div>
      }
      items={[
        { current: section === 'form', id: 'form', label: 'Complete form' },
        { current: section === 'states', id: 'states', label: 'System states' },
        { current: section === 'focus', id: 'focus', label: 'Keyboard & focus' },
      ]}
      onNavigate={setSection}
    />
  );

  return (
    <div className={theme}>
      <AppShell
        className="playground-shell"
        header={
          <div className="playground-topbar">
            <div>
              <span className="playground-kicker">Component playground</span>
              <strong>Shared admin core</strong>
            </div>
            <div aria-label="Theme" className="playground-actions" role="group">
              <DropdownMenu
                ariaLabel="Playground actions"
                items={[
                  {
                    id: 'refresh',
                    label: 'Refresh examples',
                    onSelect: () => {
                      // The playground keeps this action intentionally local.
                    },
                  },
                  {
                    id: 'reset',
                    label: 'Reset playground',
                    onSelect: () => {
                      applyTheme('light');
                    },
                    separatorBefore: true,
                  },
                ]}
                trigger={
                  <svg aria-hidden="true" className="playground-more-icon" viewBox="0 0 20 20">
                    <circle cx="5" cy="10" r="1.25" />
                    <circle cx="10" cy="10" r="1.25" />
                    <circle cx="15" cy="10" r="1.25" />
                  </svg>
                }
              />
              <Button
                aria-pressed={theme === 'light'}
                onClick={() => {
                  applyTheme('light');
                }}
                size="sm"
                variant="ghost"
              >
                Light
              </Button>
              <Button
                aria-pressed={theme === 'dark'}
                onClick={() => {
                  applyTheme('dark');
                }}
                size="sm"
                variant="ghost"
              >
                Dark
              </Button>
            </div>
          </div>
        }
        navigation={navigation}
        onOpenChange={setNavigationOpen}
        open={navigationOpen}
      >
        <div className="playground-stack">
          <header className="playground-heading">
            <div>
              <p className="playground-kicker">Plan 2 / React core</p>
              <h1>Restaurant settings</h1>
              <p>Real states, direct callbacks and a calm operational density.</p>
            </div>
            <Badge tone={published ? 'success' : 'warning'}>
              {published ? 'Published' : 'Draft'}
            </Badge>
          </header>

          <section aria-labelledby="form-title" className="playground-card">
            <div className="playground-section-heading">
              <div>
                <p className="playground-kicker">Complete form</p>
                <h2 id="form-title">Public identity</h2>
              </div>
              <StatusText tone="neutral">Autosave off</StatusText>
            </div>
            <div className="playground-form-grid">
              <Field hint="Shown in the menu header." label="Restaurant name" required>
                <Input onValueChange={setRestaurant} value={restaurant} />
              </Field>
              <Field label="Primary language">
                <Select
                  onValueChange={setLanguage}
                  options={[
                    { id: 'es', label: 'Español' },
                    { id: 'en', label: 'English' },
                    { id: 'eu', label: 'Euskara' },
                  ]}
                  value={language}
                />
              </Field>
              <Field label="Description" optional>
                <Textarea defaultValue="Seasonal cooking, served without hurry." rows={4} />
              </Field>
              <Checkbox
                checked={published}
                label="Publish changes immediately"
                onCheckedChange={setPublished}
              />
              <Switch
                checked={published}
                label="Available for ordering"
                onCheckedChange={setPublished}
              />
            </div>
            <div className="playground-actions">
              <Button variant="secondary">Discard</Button>
              <Button>Save changes</Button>
            </div>
          </section>

          <section aria-label="Status and confirmation examples" className="playground-grid">
            <div className="playground-card">
              <p className="playground-kicker">Loading / error / success</p>
              <InlineMessage message="Menu data is being refreshed." title="Loading" tone="info" />
              <InlineMessage
                message="Check the closing time and save again."
                title="Schedule conflict"
                tone="error"
              />
              <InlineMessage
                message="All public changes are live."
                title="Published"
                tone="success"
              />
            </div>
            <div className="playground-card playground-danger-card">
              <p className="playground-kicker">Destructive confirmation</p>
              <h2>Delete seasonal menu</h2>
              <p>The safe action receives initial focus; Escape returns focus to this trigger.</p>
              {removed ? (
                <InlineMessage message="Seasonal menu deleted." tone="success" />
              ) : (
                <Button
                  onClick={() => {
                    setConfirmOpen(true);
                  }}
                  ref={confirmTriggerRef}
                  variant="destructive"
                >
                  Delete menu
                </Button>
              )}
            </div>
          </section>

          <section aria-label="Taxonomy examples" className="playground-card">
            <p className="playground-kicker">Taxonomy</p>
            <h2>Session tags</h2>
            <p>
              Filter with the search field or move between options with the arrow keys; Enter
              toggles the focused tag.
            </p>
            <div className="playground-form-grid">
              <TagPicker onValueChange={setTags} options={TAG_OPTIONS} value={tags} />
              <div>
                <p className="playground-kicker">Applied tags</p>
                <TagList
                  interactive
                  items={TAG_OPTIONS.filter((option) => tags.includes(option.id))}
                  onValueChange={setTags}
                  value={tags}
                />
              </div>
            </div>
          </section>

          <section className="playground-focus-note">
            <strong>Keyboard check</strong>
            <span>
              Press Tab through controls: every interactive target keeps a 3 px visible ring.
            </span>
          </section>
          <OverviewPanel
            description="Operational blocks keep data, actions and state explicit."
            stats={[
              { id: 'sessions', label: 'Sessions', value: '12' },
              { id: 'photos', label: 'Photos', value: '184' },
              { id: 'tags', label: 'Tags', value: '9' },
            ]}
            status={{ label: 'Live data', tone: 'success' }}
            title="Portfolio health"
          />
          <ResourceTable
            ariaLabel="Recent sessions"
            columns={[
              { id: 'title', header: 'Session', render: (row) => row.title, sortable: true },
              { id: 'photos', header: 'Photos', render: (row) => row.photos, align: 'end' },
            ]}
            getRowId={(row) => row.id}
            rows={[{ id: 'evening', title: 'Evening editorial', photos: 24 }]}
            responsive="stacked"
          />
          <MediaBrowser emptyLabel="Add a public image URL to preview media." items={[]} />
        </div>
      </AppShell>
      <ConfirmAction
        message="The menu and its availability schedule will be removed. This cannot be undone."
        onConfirm={() => {
          setRemoved(true);
          setConfirmOpen(false);
        }}
        onOpenChange={setConfirmOpen}
        open={confirmOpen}
        title="Delete seasonal menu?"
        triggerRef={confirmTriggerRef}
      />
    </div>
  );
}

const root = document.querySelector('#root');
if (!root) throw new Error('Missing playground root.');

createRoot(root).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
