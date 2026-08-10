import * as React from 'react'
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'

import { cn } from '@/lib/utils'

/* Табы дизайн-системы.
 *
 * Примитив взят из Base UI — той же основы, на которой собран shadcn
 * (components.json: base = "base"). CLI сюда не дотянулся: сетевая политика
 * окружения закрывает ui.shadcn.com, поэтому файл написан по контракту
 * примитива вручную. Структура и имена — как у shadcn: Tabs / TabsList /
 * TabsTrigger / TabsContent поверх TabsPrimitive.
 *
 * Скин НЕ дефолтный. rules/chiposh.md прямо запрещает сегментированный
 * контрол shadcn (серая капсула с белой пилюлей). Здесь свой вид:
 * прокручиваемый ряд капсовых подписей с трекингом, подчёркивание активного
 * на 1.5px и волосяная линия под всем рядом. Классы .tabs и .tab оставлены
 * из перенесённого chiposh.css — они и есть источник этого вида.
 *
 * От примитива нам нужно поведение, а не оформление: roving tabindex,
 * стрелки влево-вправо, Home/End, aria-selected и связь с панелями.
 */

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} data-slot="tabs" className={className} {...props} />
))
Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    /* data-rail — перетаскивание ленты мышью, его вешает рантайм виджета */
    data-rail
    className={cn('tabs', className)}
    {...props}
  />
))
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Tab>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Tab>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Tab
    ref={ref}
    data-slot="tabs-trigger"
    /* активное состояние примитив помечает data-active; как оно выглядит —
       описано в src/styles/theme.css рядом с правилом .tab.is-on */
    className={cn('tab', className)}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Panel>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Panel>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Panel ref={ref} data-slot="tabs-content" className={className} {...props} />
))
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
