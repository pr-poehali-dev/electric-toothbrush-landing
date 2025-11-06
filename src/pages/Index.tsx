import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const modelRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !modelRef.current) return;
    
    const rect = modelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    setRotation({
      x: rotation.x + deltaY * 0.5,
      y: rotation.y + deltaX * 0.5
    });
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SmilePro
          </h1>
          <div className="hidden md:flex gap-8">
            {['hero', 'benefits', 'specs', 'reviews', 'pricing', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {section === 'hero' ? 'Главная' : 
                 section === 'benefits' ? 'Преимущества' :
                 section === 'specs' ? 'Характеристики' :
                 section === 'reviews' ? 'Отзывы' :
                 section === 'pricing' ? 'Цены' : 'Контакты'}
              </button>
            ))}
          </div>
          <Button className="hidden md:inline-flex">Купить</Button>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                Твоя улыбка —{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  наша миссия
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Электрическая зубная щетка нового поколения с технологией ультразвуковой чистки и ИИ-контролем давления
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="text-lg px-8">
                  Заказать сейчас
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Узнать больше
                </Button>
              </div>
            </div>

            <div
              ref={modelRef}
              className="relative h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
              onMouseDown={() => setIsDragging(true)}
              onMouseMove={handleMouseMove}
            >
              <div
                className="relative w-full h-full transition-transform duration-100"
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <img
                  src="https://cdn.poehali.dev/projects/1a80b072-af8b-421a-8732-a6072d0384ec/files/0d6b2770-2328-4a67-b80c-c519d0e54477.jpg"
                  alt="SmilePro Toothbrush"
                  className="w-full h-full object-contain drop-shadow-2xl animate-float"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">Преимущества SmilePro</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Zap', title: '40 000 колебаний/мин', desc: 'Ультразвуковая технология для глубокой чистки' },
              { icon: 'Gauge', title: 'ИИ датчик давления', desc: 'Защита десен от повреждений' },
              { icon: 'Battery', title: '30 дней работы', desc: 'Одна зарядка на месяц использования' },
              { icon: 'Droplets', title: 'IPX7 водозащита', desc: 'Полностью водонепроницаемый корпус' },
              { icon: 'Timer', title: 'Умный таймер', desc: '2 минуты с напоминанием смены зоны' },
              { icon: 'Sparkles', title: '5 режимов чистки', desc: 'Для любой чувствительности зубов' },
            ].map((benefit, i) => (
              <Card key={i} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <Icon name={benefit.icon} size={32} className="text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="specs" className="py-20 px-6 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">Технические характеристики</h3>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: 'Частота колебаний', value: '40 000 в минуту' },
                  { label: 'Время работы', value: 'до 30 дней' },
                  { label: 'Время зарядки', value: '4 часа' },
                  { label: 'Режимы чистки', value: '5 режимов' },
                  { label: 'Водозащита', value: 'IPX7' },
                  { label: 'Насадки в комплекте', value: '3 шт' },
                  { label: 'Вес', value: '120 г' },
                  { label: 'Гарантия', value: '2 года' },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-4">
                    <span className="text-gray-600">{spec.label}</span>
                    <span className="font-semibold text-lg">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">Отзывы наших клиентов</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Анна Петрова', rating: 5, text: 'Лучшая зубная щетка, которой я пользовалась! Зубы стали заметно белее всего за неделю.' },
              { name: 'Дмитрий Соколов', rating: 5, text: 'ИИ датчик давления реально работает. Десны больше не кровоточат после чистки.' },
              { name: 'Елена Иванова', rating: 5, text: 'Заряда хватает действительно на месяц! И дизайн просто космический.' },
            ].map((review, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Icon key={j} name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <p className="font-semibold">{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">Выберите свой комплект</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Базовый', price: '4 990', features: ['Щетка SmilePro', '1 насадка', 'Зарядное устройство', 'Гарантия 1 год'] },
              { name: 'Стандарт', price: '6 990', features: ['Щетка SmilePro', '3 насадки', 'Зарядное + чехол', 'Гарантия 2 года'], popular: true },
              { name: 'Премиум', price: '9 990', features: ['Щетка SmilePro', '5 насадок', 'Беспроводная зарядка', 'Гарантия 3 года'] },
            ].map((plan, i) => (
              <Card key={i} className={`p-8 ${plan.popular ? 'ring-4 ring-yellow-400 scale-105' : 'bg-white/10 backdrop-blur-sm border-white/20'}`}>
                {plan.popular && (
                  <div className="bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-full w-fit mb-4">
                    Популярный
                  </div>
                )}
                <h4 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-gray-900' : 'text-white'}`}>{plan.name}</h4>
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-gray-900' : 'text-white'}`}>{plan.price}</span>
                  <span className={`text-xl ml-2 ${plan.popular ? 'text-gray-600' : 'text-white/70'}`}>₽</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className={`flex items-center gap-2 ${plan.popular ? 'text-gray-700' : 'text-white/90'}`}>
                      <Icon name="Check" size={20} className={plan.popular ? 'text-green-600' : 'text-green-300'} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-white text-primary hover:bg-white/90'}`}>
                  Выбрать
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h3 className="text-4xl font-bold mb-8">Остались вопросы?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Свяжитесь с нами любым удобным способом
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">
              <Icon name="Phone" className="mr-2" size={20} />
              +7 (800) 555-35-35
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              <Icon name="Mail" className="mr-2" size={20} />
              info@smilepro.ru
            </Button>
          </div>
          <div className="flex gap-6 justify-center mt-12">
            {['Instagram', 'Facebook', 'Youtube'].map((social) => (
              <button
                key={social}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Icon name={social} size={24} className="text-white" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">© 2025 SmilePro. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
