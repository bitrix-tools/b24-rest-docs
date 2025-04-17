# Учет рабочего времени: обзор методов

Учет рабочего времени в Битрикс24 помогает организовать рабочий процесс и контролировать соблюдение графика сотрудниками.

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [время и отчеты в Битрикс24](https://helpdesk.bitrix24.ru/open/17832334/)

## Рабочий день

Учет рабочего времени фиксирует отработанные часы сотрудника. Для этого сотрудник отмечает начало и конец рабочего дня в системе. Управлять рабочим днем можно группой методов [timeman.*](./base/index.md).

{% note tip "Пользовательская документация" %}

-  [Как вести учет рабочего времени в Битрикс24](https://helpdesk.bitrix24.ru/open/21604602)

{% endnote %}

## Рабочий график

Рабочий график задает режим и продолжительность работы сотрудников. Получить настройки рабочего графика можно методом [timeman.schedule.get](./schedule/timeman-schedule-get.md)

{% note tip "Пользовательская документация" %}

-  [Рабочие графики](https://helpdesk.bitrix24.ru/open/17937890/)

{% endnote %}

## Контроль времени

Учет рабочего времени проверяет соответствие рабочего времени сотрудника установленному графику. Система записывает нарушения графика и руководитель может просматривать отчеты о нарушениях.

Работать с отчетами и настраивать контроль времени можно с помощью группы методов [timeman.timecontrol.*](./timecontrol/index.md).

{% note tip "Пользовательская документация" %}

-  [Как контролировать рабочее время сотрудников](https://helpdesk.bitrix24.ru/open/17921146/)

{% endnote %}

## Офисные сети

Офисная сеть — это группа IP-адресов, используемых в локальной сети организации. Работа с диапазонами IP-адресов офисной сети выполняется методами группы [timeman.networkrange.*](./networkrange/index.md).

## Обзор методов {#all-methods}

> Scope: [`timeman`](../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Рабочий день

#|
|| **Метод** | **Описание** ||
|| [timeman.open](./base/timeman-open.md) | Начать новый рабочий день или возобновить закрытый ||
|| [timeman.pause](./base/timeman-pause.md) | Поставить паузу в рабочем дне ||
|| [timeman.close](./base/timeman-close.md) | Закрыть рабочий день ||
|| [timeman.status](./base/timeman-status.md) | Получить информацию о текущем рабочем дне пользователя ||
|| [timeman.settings](./base/timeman-settings.md) | Получить настройки рабочего времени пользователя ||
|#

### Рабочий график

#|
|| **Метод** | **Описание** ||
|| [timeman.schedule.get](./schedule/timeman-schedule-get.md) | Получает рабочий график по идентификатору ||
|#

### Контроль времени

#|
|| **Метод** | **Описание** ||
|| [timeman.timecontrol.report.add](./timecontrol/timeman-timecontrol-report-add.md) | Отправляет отчет о выявленном отсутствии ||
|| [timeman.timecontrol.reports.get](./timecontrol/timeman-timecontrol-reports-get.md) | Получает отчет о выявленных отсутствиях ||
|| [timeman.timecontrol.settings.get](./timecontrol/timeman-timecontrol-settings-get.md) | Получает настройки инструмента контроля времени ||
|| [timeman.timecontrol.settings.set](./timecontrol/timeman-timecontrol-settings-set.md) | Устанавливает настройки инструмента контроля времени ||
|| [timeman.timecontrol.reports.settings.get](./timecontrol/timeman-timecontrol-reports-settings-get.md) | Получает пользовательские настройки для построения интерфейса отчетов инструмента контроля времени ||
|| [timeman.timecontrol.reports.users.get](./timecontrol/timeman-timecontrol-reports-users-get.md) | Получает список пользователей указанного подразделения ||
|#

### Офисные сети

#|
|| **Метод** | **Описание** ||
|| [timeman.networkrange.get](./networkrange/timeman-networkrange-get.md) | Получает диапазоны сетевых адресов, входящие в офисную сеть ||
|| [timeman.networkrange.set](./networkrange/timeman-networkrange-set.md) | Устанавливает диапазоны сетевых адресов, входящие в офисную сеть ||
|| [timeman.networkrange.check](./networkrange/timeman-networkrange-check.md) | Проверяет входит ли IP-адрес в диапазоны сетевых адресов офисной сети ||
|#
