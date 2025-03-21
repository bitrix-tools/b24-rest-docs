# Лимиты REST API

Лимиты на интенсивность запросов и ресурсоемкость выполняемых запросов, описанные в этом разделе, относятся к облачной версии Битрикс24. Коробочные установки могут самостоятельно регулировать нагрузку, создаваемую REST-запросами за счет собственных серверных настроек.

Ограничения на REST API в облачной версии введены с целью регулирования общей нагрузки - для того, чтобы конкретный Битрикс24, неэффективно использующий средства автоматизации, не создавал проблем для других пользователей сервиса.

## Ограничения на интенсивность запросов

Лимит на интенсивность запросов к Битрикс24 реализован по принципу Leaky Bucket Algorithm. Это позволяет, с одной строны, разрешить приложениям кратковременно выполнять запросы очень интенсивно, а с другой стороны, не позволяет делать это постоянно.

Работает это следующим образом:

1. Каждый входящий запрос от приложения увеличивает условный "счетчик запросов" на стороне Битрикс24
2. Как только значение "счетчика" превышает пороговое значение Х, каждый следующий входящий запрос блокируется. Приложение в ответ получает статус `503` с кодом ошибки `QUERY_LIMIT_EXCEEDED`
3. Параллельно значение счетчика автоматически уменьшается на Y раз в секунду

Из логики этого механизма следует два вывода:

1. Если ваше приложение будет делать не более Y запросов в секунду, то оно никогда не столкнется с ошибкой `QUERY_LIMIT_EXCEEDED`
2. Если специфика вашего приложения требует кратковременно делать много запросов - это возможно. Нет такого ограничения "нельзя выполнять больше Y запросов в секунду". Можно делать достаточно много запросов в секунду, просто не получится это делать постоянно. Например, так происходит в интеграциях с телефониями, когда по независящим от приложения причинам вдруг случается несколько входящих звонков сразу.

Пороговые значения Х и Y, о которых шла речь выше, зависят от тарифного плана.

#|
|| **Тариф** | **Скорость уменьшения счетчика**,
`Y` | **Лимит до блокировки**,
`X` ||
|| Энтерпрайз | 5 в сек | 250 ||
|| Прочие | 2 в сек | 50 ||
|#

{% note info "Важные особенности" %}

Важно знать, что учет интенсивности ведется для каждого портала Битрикс24 отдельно. Иными словами, если ваше приложение слишком интенсивно использует REST на одном портале и попадет под ограничения, это не затронет работу приложения на другом портале. Иными словами, пользователи на разных порталах могут пользоваться вашими решениями с разной интенсивностью, что позволяет вам делать логику приложения достаточно гибкой.

С другой стороны, Битрикс24 учитывает только IP-адрес, с которого происходит обращение при выполнении REST-запроса. Иными словами, если на вашем сервере есть несколько приложений и все эти приложения работают с одним и тем же Битрикс24, то ограничение на интенсивность запроса у них будет общее - одно на все приложения сразу. Учитывайте эту особенность при проектировании.

{% endnote %}

### Что делать, если надо выполнять много запросов?

На самом деле, ограничения REST API в Битрикс24 очень щадящие для продуктов своего класса. Даже если выполнять по 2 запроса в секунду, то в сутки это позволит выполнить 172800 запросов на портале. Фактически же, как вы могли понять из описания механизма ограничений, Битрикс24 позволяет выполнять больше запросов.

Кроме того, **запрос** не равно **запись**.

В частности, для получения данных из Битрикс24 почти всегда можно использовать списочные методы *.list, которые возвращают по 50 записей за один запрос. Иными словами, с той же минимальной интенсивностью по 2 запроса в секунду за сутки можно получить из Битрикс24 8 640 000 лидов или сделок.

Кроме этого, в REST API Битрикс24 существует метод batch, который позволяет выполнять 50 запросов за один хит. Счетчик увеличится на единицу, а приложение, фактически, выполнит 50 разных REST-запросов.

Используя batch, внутри которого последовательно выполняются 50 запросов к списочным методам *.list позволяют за один хит получить из Битрикс24 2500 записей (50 запросов по 50 записей в результате). При таком подходе за сутки можно получить 432 000 000 записей.

Конечно, следует учитывать, что помимо интенсивности запросов, в таких кейсах начинает также играть роль ограничение на ресурсоемкость выполняемых запросов и на практике вы вряд ли сможете получить такие объемы данных за такой промежуток времени. И в целом, REST как подход не предназначен для такого массового и интенсивного обмена данными. Именно поэтому для встроенного BI-коннектора, который предназначен для получения больших данных, в Битрикс24 использован совсем другой механизм.

Тем не менее, комбинирование batch со списочными методами и правильный учет интенсивности запросов, успешно позволяет решать подавляющее большинство задач, стоящих перед разработчиками. 

## Ограничения на ресурсоемкость

В облачной версии Битрикс24 во всех ответах REST-запросов в массиве `time` с дополнительной информацией о времени выполнения запроса добавлен дополнительный ключ `operating`, который говорит о времени выполнения запроса к конкретному методу.

Например

```json
{
    ...
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

Данные о времени выполнения запросов к каждому отдельному методу суммируются. 

{% note info "Срабатывание ограничений" %}

При превышении общего времени выполнения запросов сверх 480 секунд в рамках прошедших 10 минут данный метод блокируется для всех приложений и веб-хуков данного портала. При этом все остальные методы продолжают работать.

{% endnote %}

Ключ `operating_reset_at` возвращает время в формате `timestamp`, когда будет высвобождена часть лимита на данный метод.

Описанные показатели рассчитыватся внутри Битрикс24 и зависят от целого ряда взаимозависимых факторов: объема данных в портале, интенсивности работы с порталом пользователей и других приложений и т.д.

Один и тот же запрос на разных порталах может привести к различным значениям `operating` просто в силу того, что на одном портале для получения результата Битрикс24 приходится обработать 10 каких-то записей, а на другом - 10 000 записей. Иными словами, ресурсоемкость вашего запроса непредсказуема на стороне приложения.

Однако есть [ряд рекомендаций](api-reference/performance/index.md), следуя которым, вы можете снизить риски срабатывания ограничений по ресурсоемкости.
