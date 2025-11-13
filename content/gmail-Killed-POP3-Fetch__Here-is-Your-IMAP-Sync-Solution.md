---
title: "Gmail Killed POP3 Fetch? Here's Your IMAP Sync Solution"
description: "Gmail is ending POP3 fetch support. Learn how to migrate and sync your emails from any IMAP server to Gmail automatically"
slug: "gmail-pop3-fetch-alternative-imap-sync-solution"
date: 2025-11-13T14:30:00+02:00
draft: false
tags: ["gmail", "email-migration", "imap", "pop3", "python", "automation"]
---

####
#### 2025-11-13

**Introduction**
--------------------------------------

**IMAP to Gmail Sync Setup: A Step-by-Step Guide**
=====================================================

Ever needed to migrate emails from an old email server to Gmail? Or maybe you want to backup your work emails to your personal Gmail account? This handy Python tool allows you to sync emails from any IMAP server directly to Gmail while preserving dates, supporting incremental syncs, and handling thousands of messages with ease. In this blog post, I'll walk you through the setup process and show you how to manage multiple accounts like a pro.

**Prerequisites**
---------------

* Python 3.10+ installed on your machine
* Access to both source IMAP server credentials and Gmail account
* For Gmail: You'll need to create an App Password (don't worry, I'll show you how!)
* Basic terminal/command-line knowledge

**Step 0: Clone the Repository**
--------------------------------------

```bash
git clone git@github.com:vtripolitakis/imap_sync_to_gmail.git
cd imap_sync_to_gmail
```

**Step 1: Install Dependencies**
--------------------------------------

First, let's get the required Python packages installed:
```bash
pip install imapclient python-dotenv
```

Or if you prefer using the requirements file:
```bash
pip install -r requirements.txt
```

**Step 2: Create a Gmail App Password**
--------------------------------------

This is crucial! Gmail won't let you use your regular password for IMAP access. Here's how to create an App Password:

1. Go to your [Google Account Security page](https://myaccount.google.com/security)
2. Make sure 2-Step Verification is enabled (required for App Passwords)
3. Scroll down to "App passwords" and click it
4. Select "Mail" as the app and generate a password
5. Copy that 16-character password - you'll need it in a moment!

**Step 3: Configure Your First Account**
--------------------------------------

Create your configuration file from the example:
```bash
cp account1.conf.example account1.conf
```

Now edit `account1.conf` with your favorite editor and fill in your credentials:
```bash
# Source IMAP (server A)
SRC_IMAP_HOST=imap.your-server.com
SRC_IMAP_USER=you@your-server.com
SRC_IMAP_PASS=your-source-password
SRC_FOLDER=INBOX

# Gmail IMAP
GMAIL_IMAP_HOST=imap.gmail.com
GMAIL_USER=you@gmail.com
GMAIL_APP_PASS=your-16-char-app-password
GMAIL_FOLDER=Imported/OldServer

# State file - tracks sync progress
STATE_FILE=/var/tmp/imap_sync_state_account1.json
```

**Step 4: Run Your First Sync**
----------------------

Now for the magic moment:
```bash
python3 imap_sync_to_gmail.py --config account1.conf
```

The script will:
- Connect to your source IMAP server
- Fetch messages in batches
- Upload them to Gmail preserving original dates
- Track progress in a state file for resumable syncs

You should see output like:
```
INFO: Connected to source IMAP: imap.your-server.com
INFO: Found 1,234 messages to sync
INFO: Syncing batch 1-500...
INFO: Syncing batch 501-1000...
INFO: Sync complete! Synced 1,234 messages
```

**Step 5: Set Up Multiple Accounts (Optional)**
----------------------

Got multiple email accounts to migrate? No problem! Create separate config files:

```bash
cp account1.conf.example work.conf
cp account2.conf.example personal.conf
```

Edit each config file with the respective credentials, then sync them separately:
```bash
python3 imap_sync_to_gmail.py --config work.conf
python3 imap_sync_to_gmail.py --config personal.conf
```

**Bonus: Advanced Usage Patterns**
--------------------------------------

**Filter by Date**

Only want emails from 2024 onwards? Add this to your config:
```bash
AFTER_DATE=2024-01-01
```

Or pass it directly:
```bash
AFTER_DATE=2024-01-01 python3 imap_sync_to_gmail.py --config work.conf
```

**Override Gmail Label**

Want to change the destination label without editing the config?
```bash
python3 imap_sync_to_gmail.py --config work.conf --gmail-label "Work/Archive/2024"
```

Notice the `/` syntax? That creates nested labels in Gmail - super handy for organization!

**Set Up Automated Syncs**

Want continuous syncing? Add it to cron:
```bash
crontab -e
```

Add this line to sync every hour:
```bash
0 * * * * cd /path/to/mailsync && python3 imap_sync_to_gmail.py --config work.conf >> /var/log/mailsync.log 2>&1
```

**Bonus: Troubleshooting Tips**
---------------------------------------------

**Enable Debug Logging**

If something goes wrong, turn on detailed logging:
```bash
LOG_LEVEL=DEBUG python3 imap_sync_to_gmail.py --config account1.conf
```

**Start Fresh**

If you need to restart the sync from scratch, just delete the state file:
```bash
rm /var/tmp/imap_sync_state_account1.json
```

**Authentication Failed?**

- Double-check you're using the Gmail App Password, not your regular password
- Make sure 2FA is enabled on your Google Account
- Verify your source IMAP credentials are correct

**Features That Make This Tool Awesome**
--------------------------------------

* **Incremental Sync**: Remembers where it left off - you can run it multiple times and it only syncs new messages
* **Batch Processing**: Handles thousands of messages without breaking a sweat
* **Date Filtering**: Only sync messages after a specific date
* **Multiple Accounts**: Use different config files for different accounts
* **Preserves Dates**: Original message timestamps are maintained
* **Resumable**: Got interrupted? Just run it again - it picks up where it left off
* **Nested Labels**: Create organized label hierarchies in Gmail

####
That's it! With these steps, you should now have your emails flowing into Gmail automatically. Whether you're migrating from an old server or setting up continuous backups, this tool has got you covered.

have fun! ❤
