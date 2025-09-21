# Club Celestius Official Page

Welcome to *Club Celestius* official page! This is the central hub where members contribute, innovate, and collaborate.

---

## How You Can Contribute

- Add or improve content on this page.
- Share ideas, feedback, or suggestions.
- Help document projects, features, or updates.
- Participate in discussions and collaborate with the community.

---

## Table of Contents

1. [Getting Started](#getting-started)  
2. [Contributing Guidelines](#contributing-guidelines)  
3. [Branching & Workflow](#branching--workflow)  
4. [Coding Standards & Style Guides](#coding-standards--style-guides)  
5. [Review & Merging Process](#review--merging-process)  
6. [Code of Conduct](#code-of-conduct)  
7. [Licensing](#licensing)  
8. [Contact & Support](#contact--support)  

---

## Getting Started

To begin contributing:

1. **Fork the repository** on GitHub
    - Click the **Fork** button in the top-right corner to create your own copy.
2. **Clone your fork locally**:
    
    ```bash
    git clone https://github.com/<your-username>/club-celestius.git
    cd club-celestius
    ```
    
3. **Set up upstream** to stay synced with the original repository:
    
    ```bash
    git remote add upstream https://github.com/<your-org>/club-celestius.git
    git fetch upstream
    ```
    
4. **Checkout the `dev` branch**:
    
    ```bash
    git checkout dev
    git pull upstream dev
    ```
    
5. **Create a new feature branch**:
    
    ```bash
    git checkout -b feature/<your-feature-name>
    ```
    
6. **Make your changes**, commit often with meaningful messages, then push your feature branch to **your fork**:
    
    ```bash
    git push origin feature/<your-feature-name>
    ```
    
7. **Open a Pull Request (PR)** into `dev` of the main repository and follow the review process.

---

## Contributing Guidelines

- Before you start, check existing issues & PRs to avoid duplicate work.
- Use clear, descriptive commit messages (“Add”, “Fix”, “Update”, etc.), plus what & why.
- Maintain small, focused PRs — easier to review, less likely to conflict.

---

## Branching & Workflow

| Branch | Purpose |
| --- | --- |
| `main` | Stable, release-ready code. Only merges from `dev` after testing. |
| `dev` | Active development. All feature branches merge here. |
| `feature/<feature-name>` | For individual contributions. Branch off from `dev`. |

**Workflow summary:**

1. Sync `dev` with upstream regularly.
2. Make feature branches off `dev`.
3. Rebase or merge upstream `dev` into your feature branch periodically to minimize drift.
4. Raise PRs into `dev`.

---

## Coding Standards & Style Guides

- Use consistent indentation (e.g. 2 or 4 spaces, specify) and formatting.
- Include comments for non-obvious logic.
- Ensure that no sensitive credentials or secrets are hard-coded or committed.

---

## Review & Merging Process

- At least **one** peer review required before merging into `dev`. More for major changes.
- Maintain continuous integration (CI) must pass before PRs can be merged.
- For merging strategy:
    - **Squash and merge** for small, self-contained features or fixes.
    - **Rebase and merge** preferred when multiple logical commits that benefit from history clarity.
    - Avoid large merge commits unless they capture meaningful group changes (e.g. version bump, refactor).
- Resolve conflicts before merge; PR author should rebase or merge `dev` into feature branch when conflicts arise.

---

## Code of Conduct

We believe in creating a welcoming environment. By participating, you agree to:

- Be respectful in discussions — judge ideas, not people.
- Accept feedback graciously.
- Avoid toxic behavior, harassment, or inappropriate language.
- Report any misconduct to maintainers.

---

## Licensing

This project is licensed under the Apache-2.0. See LICENSE for full details.

---

## Contact & Support

If you need help:

- File an issue using the **“Support / Questions”** label.
- Reach a maintainer: **@admin-celestius**.

---

### Acknowledgments

Thanks to everyone who contributes, reviews, documents, tests — each part is vital. Together we grow stronger, sharper, better.