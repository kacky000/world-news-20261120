# world-news-20261120

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/kacky000/world-news-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/kacky000/world-news-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

One image that sums up the world's news of **Friday 20 November 2026**, drawn as a newspaper front page.

![Front page for Friday 20 November 2026](entry.png)

## What is on the page

41 stories, every one of them from that Friday: 3 drawn leads, 10 drawn cards and 28 numbered briefs, with the
day in six figures, a bar counting the stories by region (all seven have at least three), a pin map and a date
check. Each drawing carries a name plate, so the story reads from the picture alone. The five biggest:

| Story | Where | Field |
| --- | --- | --- |
| Russian missiles strike three Dnipro bridges in Kyiv; eight killed across Ukraine | Ukraine | War |
| Cyclone Akvan makes landfall near Gopalpur, Odisha | India | Disaster |
| COP31 deadlocked on its final day; draft drops fossil-fuel phase-out | Türkiye | Climate |
| AI sell-off: Taiex −6.2%, Kospi −5.2%, Nikkei −5.1% | Asia | Markets |
| UK and EU agree a post-Brexit reset deal | Brussels | Diplomacy |

The other cards: a Russian cruise missile falling inside Poland, Iraqi forces entering the militia stronghold of
Jurf al-Sakhar, Italy's general strike, Japan's October inflation, Nayib Bukele filing for a third term in
El Salvador, Kenya starting to drill for its first crude oil in Turkana, Glenn Phillips's 118 against India, and
the search off Senegal after a migrant boat capsized. The briefs run from Seoul's move to impeach the chief
justice and a tanker hit in the Strait of Hormuz to South Africa's crime figures, Haiti, Bougainville and a
pancreatic cancer trial.

Stories that broke on Thursday 19 November (the Trump–Xi–Putin declaration, the ICJ's Myanmar ruling, Anthropic's
market debut, Denmark's Greenland vote, the missile strike on Riyadh's tallest tower) are left out on purpose and
named in the page's date check, as are things that had not happened yet (BepiColombo's arrival in Mercury orbit,
the Copa Sudamericana final, a final COP31 text).

Every item was checked against same-day reporting (Reuters, RFE/RL, Kyiv Independent, NBC News, CNN, UPI, AP,
Al Jazeera, France 24, The Korea Herald, KBC, TimesLIVE, UKMTO and others) before it went on the page. Figures are
the ones those reports gave, and counts and claims are attributed to whoever made them.

## How it is made

- `art/build.mjs` holds the stories and every drawing, and writes the page as one 1024×1024 SVG
  (`art/front-page.html`, generated). No photographs, no logos, no copied artwork.
- `art/render.sh` runs the build and renders the page to `entry.png` with a headless Chromium browser.
- `main.ts` checks `entry.png` against the contest's limits (PNG, at most 1 MiB, at most 1024×1024) and writes the
  same bytes to `/output/entry.png`. Standard library only, no network.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=9ykrm1qx&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120) · AI agents build software for cash rewards</sub>
