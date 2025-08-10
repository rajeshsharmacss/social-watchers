// assets/js/team.js
(function () {
  const DATA_URL = 'assets/data/members.json';
  const Fallback = 'images/avatar-placeholder.jpg';

  const byId = (id) => document.getElementById(id);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html) n.innerHTML = html;
    return n;
  };

  const icon = (kind, href) => href ? `<a href="${href}" target="_blank" rel="noopener"><i class="fa fa-${kind}"></i></a>` : '';

  const personCard = (p) => {
    const card = el('article', 'card');
    const img = el('img');
    img.src = p.photo || Fallback;
    img.alt = p.name || 'Member';
    card.appendChild(img);
    card.appendChild(el('h3', '', p.name || '—'));
    if (p.role) card.appendChild(el('p', '', p.role));
    return card;
  };

  const tile = (p) => {
    const t = el('article', 'tile');
    const img = el('img');
    img.src = p.photo || Fallback;
    img.alt = p.name || 'Member';
    t.appendChild(img);
    t.appendChild(el('h4', '', p.name || '—'));
    if (p.role) t.appendChild(el('p', '', p.role));
    return t;
  };

  const renderLead = (lead) => {
    if (!lead) return;
    const wrap = byId('lead-wrap');
    const box = el('div', 'person');
    const img = el('img', 'person-photo');
    img.src = lead.photo || Fallback;
    img.alt = lead.name || 'Lead';
    box.appendChild(img);

    const info = el('div', 'person-info');
    info.appendChild(el('h2', '', lead.name || 'Lead'));
    if (lead.role) info.appendChild(el('p', '', lead.role));
    if (lead.bio) info.appendChild(el('p', '', lead.bio));

    const links = el('p', 'person-links');
    links.innerHTML = [
      lead.email ? `<a href="mailto:${lead.email}"><i class="fa fa-envelope"></i></a>` : '',
      icon('github', lead.github),
      icon('linkedin', lead.linkedin)
    ].join(' ');
    info.appendChild(links);

    box.appendChild(info);
    wrap.appendChild(box);
  };

  const renderManagers = (arr) => {
    const grid = byId('managers-grid');
    if (!grid || !Array.isArray(arr)) return;
    arr.forEach((p) => grid.appendChild(personCard(p)));
  };

  const renderMembers = (arr) => {
    const grid = byId('members-grid');
    if (!grid || !Array.isArray(arr)) return;
    arr.forEach((p) => grid.appendChild(tile(p)));
  };

  const renderAlumni = (arr) => {
    const list = byId('alumni-list');
    if (!list || !Array.isArray(arr)) return;
    arr.forEach((a) => {
      const li = el('li');
      li.textContent = `${a.name}${a.role ? ' — ' + a.role : ''}${a.now ? ' · now: ' + a.now : ''}`;
      list.appendChild(li);
    });
  };

  fetch(DATA_URL, { cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      renderLead(data.lead);
      renderManagers(data.managers);
      renderMembers(data.members);
      renderAlumni(data.alumni);
    })
    .catch((err) => {
      console.error('Team data failed to load:', err);
      const host = document.getElementById('team-root');
      if (host) host.appendChild(el('p', '', 'Team data is unavailable right now.'));
    });
})();

