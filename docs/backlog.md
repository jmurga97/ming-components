# Deferred catalog backlog

The first release is not blocked by unused catalog entries. Re-audit before implementation.

## P1 requiring a concrete consumer contract

- `Tabs`: loyalty routes currently compose sections without a confirmed shared contract.
- `FileUpload` and `ImageGallery`: wait for a real upload backend, product data model, item states,
  example and acceptance criteria.

## P2 without current consumption

- Radio, Switch, Combobox, Separator, Skeleton, Avatar, Tooltip, Popover and ScrollArea.
- A separately named Toast; current transient status needs are covered by `StatusRegion`.
- Pagination and public Thumbnail/ThumbnailRail subpaths.
- Chart blocks and Recharts. If a future page needs a small stable chart, prefer local SVG. Put
  Recharts behind a separate subpath/optional peer only when interaction, multiple series,
  tooltips or dynamic scales justify it.

Promote an item only with a consuming page, data model, defined states, usage example and acceptance
criteria.
