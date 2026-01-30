import { CustomizeForm } from './customize-form';

export default function CustomizePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline">Design Your Own</h1>
        <p className="text-muted-foreground mt-2 text-lg">Bring your perfect bracelet to life. Choose your style, colors, and size.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <CustomizeForm />
      </div>
    </div>
  );
}
