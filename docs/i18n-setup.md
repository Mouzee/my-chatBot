# Internationalization (i18n) Setup

This project uses a unified internationalization system built with `react-i18next` and optimized for Next.js App Router with ShadCN UI components.

## 📁 Project Structure

```
├── lib/
│   ├── i18n.ts              # Main i18n configuration
│   └── i18n-utils.ts        # Utility functions and hooks
├── public/
│   └── locales/
│       ├── en.json          # English translations
│       └── ar.json          # Arabic translations
├── components/
│   ├── language-switcher.tsx    # Language switching component
│   ├── i18n-example.tsx         # Example component demonstrating usage
│   └── providers.tsx            # I18n provider setup
```

## 🚀 Features

- ✅ **Unified Translation Source**: Single source of truth using JSON files
- ✅ **TypeScript Support**: Full type safety with translation keys
- ✅ **RTL Support**: Automatic right-to-left layout for Arabic
- ✅ **Fallback Locale**: English as default fallback
- ✅ **Automatic Detection**: Browser language detection with localStorage persistence
- ✅ **ShadCN UI Compatible**: Works seamlessly with ShadCN components
- ✅ **Next.js App Router Ready**: Optimized for App Router architecture

## 📋 Supported Languages

- **English (en)**: Default language, LTR layout
- **Arabic (ar)**: RTL layout support

## 🛠️ Usage

### Basic Translation

```tsx
import { useI18n } from "@/lib/i18n-utils"

function MyComponent() {
  const { t } = useI18n()
  
  return <h1>{t("hero.title")}</h1>
}
```

### Language Switching

```tsx
import { changeLanguage, type SupportedLanguage } from "@/lib/i18n"

function LanguageButton() {
  const handleLanguageChange = (lang: SupportedLanguage) => {
    changeLanguage(lang)
  }
  
  return (
    <button onClick={() => handleLanguageChange("ar")}>
      Switch to Arabic
    </button>
  )
}
```

### Advanced Usage with RTL Support

```tsx
import { useI18n } from "@/lib/i18n-utils"

function ResponsiveComponent() {
  const { t, currentLanguage, isRTL } = useI18n()
  
  return (
    <div className={isRTL ? "text-right" : "text-left"}>
      <h1>{t("hero.title")}</h1>
      <p>Current language: {currentLanguage}</p>
    </div>
  )
}
```

## 🔧 Configuration

### Adding New Languages

1. Create a new JSON file in `public/locales/`:
   ```json
   // public/locales/fr.json
   {
     "hero": {
       "title": "Bonjour, je suis Shafeek Ali"
     }
   }
   ```

2. Update the i18n configuration in `lib/i18n.ts`:
   ```typescript
   import frTranslations from "../public/locales/fr.json"
   
   // Add to resources
   resources: {
     en: { translation: enTranslations },
     ar: { translation: arTranslations },
     fr: { translation: frTranslations }, // New language
   }
   ```

3. Update the `SupportedLanguage` type:
   ```typescript
   export type SupportedLanguage = "en" | "ar" | "fr"
   ```

### Adding New Translation Keys

1. Add the key to all language files:
   ```json
   // public/locales/en.json
   {
     "newSection": {
       "title": "New Section Title",
       "description": "New section description"
     }
   }
   ```

2. Use in components:
   ```tsx
   const { t } = useI18n()
   return <h2>{t("newSection.title")}</h2>
   ```

## 🎨 ShadCN UI Integration

The i18n system is fully compatible with ShadCN UI components:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n-utils"

function ShadCNExample() {
  const { t } = useI18n()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("hero.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>{t("actions.submit")}</Button>
      </CardContent>
    </Card>
  )
}
```

## 🔍 TypeScript Support

The system provides full TypeScript support:

```typescript
import type { SupportedLanguage, TranslationKey } from "@/lib/i18n"

// Type-safe language switching
const changeToArabic = (lang: SupportedLanguage) => {
  if (lang === "ar") {
    changeLanguage(lang) // ✅ Type-safe
  }
}

// Type-safe translation keys (future enhancement)
const key: TranslationKey = "hero.title" // ✅ Valid key
```

## 🚀 Best Practices

1. **Use the `useI18n` hook** instead of `useTranslation` directly for better TypeScript support
2. **Keep translation keys flat** when possible for easier maintenance
3. **Use interpolation** for dynamic content: `t("welcome.niceMeet", { name: "John" })`
4. **Test RTL layouts** when adding new components
5. **Validate translation keys** exist in all languages before deployment

## 🐛 Troubleshooting

### Common Issues

1. **Translation not updating**: Ensure the component is wrapped in `I18nextProvider`
2. **RTL not working**: Check that `changeLanguage` is called with proper language code
3. **TypeScript errors**: Make sure translation keys exist in all language files

### Debug Mode

Enable debug mode in development:
```typescript
// lib/i18n.ts
debug: process.env.NODE_ENV === "development"
```

## 📚 Example Components

See `components/i18n-example.tsx` for a comprehensive example of:
- Language switching
- RTL/LTR detection
- Translation usage
- ShadCN UI integration

## 🔄 Migration from Old System

If migrating from the old system:
1. Remove duplicate translation objects from `lib/i18n.ts`
2. Update imports to use `useI18n` instead of `useTranslation`
3. Use `changeLanguage` helper instead of direct `i18n.changeLanguage`
4. Remove unused `common.json` files

## 📖 Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n)
- [ShadCN UI Components](https://ui.shadcn.com/)
