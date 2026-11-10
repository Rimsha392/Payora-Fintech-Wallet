# Payora — Fintech Mobile Wallet UI

Payora is a frontend fintech wallet prototype designed to provide a simple and intuitive digital money management experience. It features a balance overview, money transfers, transaction history, and transfer confirmation screens.

The project was designed in Figma and implemented using React and Vite.

## Features

- **Balance Overview:** View wallet balance and recent transactions.
- **Send Money:** Select recipients, enter transfer amounts, and validate transfer details.
- **Transaction History:** Browse, search, and filter transactions.
- **Transfer Confirmation:** View successful transfer details.
- **Transaction Receipt:** Access transfer information through a receipt interface.
- **Responsive Interface:** A mobile-focused layout that adapts to different screen widths.

## Design

Payora uses a professional visual identity built around purple and lilac tones, warm cream backgrounds, and clear typography.

The interface was designed in Figma using reusable components, color styles, typography styles, and button variants.

## Technologies Used

- React
- JavaScript
- Vite
- HTML5
- CSS3
- Figma

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Rimsha392/Payora-Fintech-Wallet.git
   ```

2. Navigate into the project folder:

   ```bash
   cd Payora-Fintech-Wallet
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build |
| `npm run lint` | Runs Oxlint |

## Project Structure

```text
Payora-Fintech-Wallet/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── screens/
│   ├── utils/
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Prototype Limitations

Payora is currently a frontend demonstration, not a production banking or payment application.

- Wallet and transaction data use sample data.
- Transfers are simulated locally.
- No real banking, payment gateway, or backend integration is included.
- Application state resets when the page is refreshed.
- Authentication and persistent account storage are not implemented.

## Project Status

The core wallet interface and simulated transfer flow have been implemented. The production build has been tested successfully.

## Acknowledgements

Developed as part of a UI/UX design and frontend development internship portfolio project.