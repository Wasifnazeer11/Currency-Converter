import Image from 'next/image'
import CurrencyConverter  from '@/components/CurrencyConverter'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
          < CurrencyConverter/>
    </main>
  )
}
