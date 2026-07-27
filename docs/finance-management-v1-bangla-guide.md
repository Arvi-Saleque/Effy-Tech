# EffyOps Finance — বাংলা ব্যবহারবিধি

এই মডিউলের মূল নিয়ম হলো: **প্রকল্পের চুক্তিমূল্য Projects পাতায় থাকবে, আর বাস্তবে টাকা আসা-যাওয়া Transactions পাতায় থাকবে।** Dashboard, chart, project collection, due, profit এবং account balance—সবকিছু এই তথ্য থেকে স্বয়ংক্রিয়ভাবে হিসাব হবে।

## প্রথমবার যা করতে হবে

1. `/admin/finance/settings` খুলে কোম্পানির আসল account যোগ করুন—যেমন City Bank, Cash, bKash বা Nagad।
2. যে তারিখ থেকে ledger লেখা শুরু করবেন, তার আগের দিনের প্রকৃত balance-কে Opening balance দিন।
3. প্রয়োজন হলে নতুন income/expense category যোগ করুন। Default category-র মধ্যে Client Payment, Domain & Hosting, Software & Tools ইত্যাদি আগে থেকেই আছে।
4. চলমান project-গুলোর চুক্তিমূল্য `/admin/finance/projects/new` থেকে সেট করুন।
5. এরপর পুরোনো ও নতুন আয়/খরচ আলাদা transaction হিসেবে যোগ করুন।

Opening balance-এর মধ্যে যে পুরোনো transaction আগে থেকেই ধরা আছে, সেটি আবার backfill করলে একই টাকা দুইবার গণনা হবে।

## কোন route কী করে

| Route | কাজ |
| --- | --- |
| `/admin/finance` | Finance overview। Today, week, month, quarter, year বা নিজের date range অনুযায়ী income, expense, net cash flow, margin, planned amount, account balance ও chart দেখায়। |
| `/admin/finance/transactions` | সম্পূর্ণ ledger। Income, expense ও account transfer দেখা, filter করা, edit বা void করা যায়। |
| `/admin/finance/transactions/new` | নতুন client payment, company expense, planned payment অথবা account transfer যোগ করার form। |
| `/admin/finance/transactions/[transactionId]/edit` | আগে যোগ করা transaction সংশোধন করার page। ভুল entry মুছে ফেলার বদলে void করলে audit history থাকে কিন্তু হিসাব থেকে বাদ যায়। |
| `/admin/finance/projects` | প্রতিটি project-এর agreed value, received, outstanding, direct cost, realized net এবং projected margin দেখায়। |
| `/admin/finance/projects/new` | কোনো existing project-এর agreed value, agreement date, deadline ও payment terms সেট করে। এখানে received amount লেখা হয় না। |
| `/admin/finance/projects/[contractId]/edit` | Project finance contract বা deadline সংশোধন করে। |
| `/admin/finance/recurring` | Domain, hosting, software subscription, salary, retainer বা নিয়মিত payment schedule দেখায়। |
| `/admin/finance/recurring/new` | নতুন recurring income/expense schedule তৈরি করে। |
| `/admin/finance/recurring/[itemId]/edit` | Recurring item-এর amount, frequency, next due date বা status বদলায়। |
| `/admin/finance/targets` | Revenue, net profit ও expense-limit target-এর progress দেখায়। |
| `/admin/finance/targets/new` | Weekly, monthly, quarterly, yearly বা custom target তৈরি করে। |
| `/admin/finance/targets/[targetId]/edit` | Target-এর amount, সময়সীমা, category scope বা status বদলায়। |
| `/admin/finance/settings` | Finance account, opening balance, income/expense category এবং সাম্প্রতিক audit activity পরিচালনা করে। |

## কোম্পানির খরচ যোগ করার নিয়ম

`/admin/finance/transactions/new` খুলে নিচের তথ্য দিন:

1. **Expense** নির্বাচন করুন।
2. Title দিন—যেমন `effytechbd.com domain renewal`।
3. Amount field-এ সরাসরি `400+300+1450` লিখতে পারেন। নিচে `Calculated total: ৳2,150` দেখা যাবে এবং database-এ `2150` save হবে। `+`, `-`, `*`, `/` ও bracket ব্যবহার করা যায়।
4. টাকা ইতিমধ্যে পরিশোধ হয়ে থাকলে **Cleared** দিন। ভবিষ্যতে দিতে হবে এমন একবারের খরচ হলে **Planned** দিন।
5. Transaction date, যে account থেকে টাকা গেছে, expense category এবং payment method নির্বাচন করুন।
6. খরচটি কোনো নির্দিষ্ট client project-এর জন্য হলে Client ও Project link করুন। সাধারণ company expense হলে এগুলো ফাঁকা রাখুন।
7. `Record transaction` চাপুন।

Cleared expense সঙ্গে সঙ্গে account balance, expense total, net cash flow ও chart-এ প্রভাব ফেলে। Planned expense forecast-এ থাকে, কিন্তু টাকা বাস্তবে না যাওয়া পর্যন্ত বর্তমান balance বা profit কমায় না।

## Client-এর টাকা বা revenue যোগ করার নিয়ম

প্রথমে main Clients ও Projects module-এ client/project থাকতে হবে। এরপর:

1. `/admin/finance/projects/new` থেকে project নির্বাচন করে মোট agreed project value দিন। এটি invoice/contract total—প্রাপ্ত টাকা নয়।
2. Client টাকা দিলে `/admin/finance/transactions/new` খুলুন।
3. **Income** এবং **Cleared** নির্বাচন করুন। ভবিষ্যতে পাওয়ার আশা করা টাকা হলে Planned ব্যবহার করুন।
4. Amount, payment date, টাকা যে account-এ এসেছে, `Client Payment` category, payment method, Client ও Project নির্বাচন করুন।
5. প্রতিটি partial payment আলাদা transaction হিসেবে save করুন।

উদাহরণ: Project value ৳45,000। প্রথমে ৳10,000 advance এবং পরে ৳15,000 পাওয়া গেলে দুটি cleared income transaction যোগ করবেন। Project page স্বয়ংক্রিয়ভাবে Received ৳25,000 এবং Outstanding ৳20,000 দেখাবে।

Project-এর জন্য Effy Tech কোনো খরচ করলে সেটিকে cleared expense হিসেবে একই Project-এর সঙ্গে link করুন। তখন Project page direct cost ও realized net-ও হিসাব করবে।

## Domain, hosting ও নিয়মিত খরচ

একবারের domain/hosting payment সরাসরি Expense transaction হিসেবে দিন। বারবার renewal হলে `/admin/finance/recurring/new` ব্যবহার করুন:

1. Recurring expense নির্বাচন করুন।
2. Amount, category, account, frequency এবং next due date দিন।
3. Due হলে Recurring list থেকে `Mark paid` চাপুন। System একই সঙ্গে cleared expense transaction তৈরি করবে এবং next due date পরের cycle-এ এগিয়ে দেবে।

একইভাবে মাসিক client retainer-কে Recurring income করা যায়; টাকা সত্যি পাওয়ার পর `Mark received` ব্যবহার করুন।

## Date picker ও amount calculation

- Finance-এর প্রতিটি date field-এর ডান পাশে দৃশ্যমান calendar button আছে। Field-এর যেকোনো জায়গা বা calendar button চাপলে browser-এর date picker খুলবে।
- Amount field-এ উদাহরণ: `400+300+1450`, `(1200+800)*2`, `1000/4`, `1,200+800`।
- অসম্পূর্ণ expression, অচেনা code, শূন্য দিয়ে ভাগ, অত্যধিক বড় value বা সাধারণ amount field-এ negative total save হবে না।
- Opening balance field-এ negative value রাখা যায়, কারণ overdraft account থাকতে পারে।

## হিসাবের নিয়ম

- Cleared income account balance ও revenue বাড়ায়।
- Cleared expense account balance ও expense বাড়ায়; net cash flow কমায়।
- Planned entry বর্তমান balance বদলায় না।
- Transfer শুধু এক account থেকে আরেক account-এ টাকা সরায়; এটি income বা expense নয়।
- Dashboard-এর date filter transaction date অনুসারে কাজ করে এবং `Asia/Dhaka` calendar ব্যবহার করে।
- Project received = ঐ project-এর সঙ্গে linked cleared income-এর যোগফল।
- Project outstanding = contract value − received; result কখনো শূন্যের নিচে যায় না।
- Project direct cost = ঐ project-এর সঙ্গে linked cleared expense-এর যোগফল।
- Void transaction history-তে থাকে, কিন্তু total ও chart থেকে বাদ যায়।
