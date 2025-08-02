import { login } from './action'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg space-y-6" method="POST">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Masuk</h1>
          <p className="text-sm text-gray-500">Silakan masuk untuk melanjutkan</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="username@email.com" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input id="password" name="password" type="password" required autoComplete="current-password" placeholder="••••••••" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"/>
        </div>

        <button formAction={login} className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-md transition-colors">
          Masuk
        </button>
      </form>
    </main>
  );
}
