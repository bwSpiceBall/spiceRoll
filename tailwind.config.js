export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // green: '#A8E6CF',
                // lime: '#DCEDC1',
                peach: '#FFDDC1',
                // pink: '#FFABAB',
                // rose: '#FF8B94',
                white: '#FFFFFF',
                'light-gray': '#F4F5F6',
                // teal: '#02E3A7',
                navy: '#13144D',
                // blue: '#103CF6',
            },
        },
    },
    plugins: ['prettier-plugin-tailwindcss'],
}
