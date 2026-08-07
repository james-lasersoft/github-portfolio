from pathlib import Path

root = Path(__file__).resolve().parents[2]

gallery = root / 'projects' / 'my-fit-ideas' / 'screenshots.md'
gallery.write_text(
    '''# My Fit Ideas Application Screenshots

These screenshots are captured from the current `main` branch user interface using non-sensitive demonstration data aligned with examples shown in the capstone report. This keeps the portfolio visually consistent with the submitted project while avoiding publication of the complete application source code or private user data.

## Login and Protected Access

![My Fit Ideas login screen](media/screenshots/login.png)

The authentication screen provides the entry point to protected application features. Portfolio capture uses a demonstration email address and no password value.

## Dashboard Summary and Navigation

![My Fit Ideas authenticated dashboard](media/screenshots/dashboard.png)

The dashboard combines current weight, daily hydration, BMI, last-measurement information, and direct navigation to the primary modules. Demonstration values mirror the capstone report examples, including a current weight of 241 lb and BMI of 31.3.

## Hydration Tracking

![My Fit Ideas hydration tracking page](media/screenshots/hydration.png)

The hydration page demonstrates daily totals, entry controls, progress toward the configured goal, and hydration history.

## Progress Analytics

![My Fit Ideas progress charts page](media/screenshots/progress-charts.png)

The progress view converts historical measurement and hydration records into selectable Chart.js visualizations for weight, body fat, body measurements, and daily hydration.

> **Privacy note:** The portfolio captures use demonstration data. Passwords, JWT values, database credentials, private email addresses, and personal health records are not displayed.
''',
    encoding='utf-8',
)

project_readme = root / 'projects' / 'my-fit-ideas' / 'README.md'
text = project_readme.read_text(encoding='utf-8')
marker = '## Application Screenshots'
block = (
    '\n\n## Application Screenshots\n\n'
    '[View the application screenshot gallery](screenshots.md) for authentication, dashboard, hydration, '
    'and progress-chart evidence captured from the current `main` branch interface using non-sensitive '
    'demonstration data.\n'
)
if marker not in text:
    project_readme.write_text(text.rstrip() + block + '\n', encoding='utf-8')

root_readme = root / 'README.md'
text = root_readme.read_text(encoding='utf-8')
link = '[View application screenshots](projects/my-fit-ideas/screenshots.md)'
if link not in text:
    root_readme.write_text(
        text.rstrip() + '\n\n## Capstone Visual Evidence\n\n' + link + '\n',
        encoding='utf-8',
    )
