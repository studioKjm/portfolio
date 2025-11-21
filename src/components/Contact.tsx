import { motion } from 'framer-motion'
import { Mail, Github, FileText, Linkedin, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import contactData from '../data/contact.json'

const Contact = () => {
  const contact = contactData
  const [emailCopied, setEmailCopied] = useState(false)

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6 },
  }

  // 이메일 복사 함수
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.error('이메일 복사 실패:', err)
    }
  }

  const contactLinks = [
    {
      name: 'GitHub',
      url: contact.github,
      icon: Github,
      color: 'bg-gray-900 hover:bg-gray-800',
    },
    {
      name: 'Resume',
      url: contact.resume,
      icon: FileText,
      color: 'bg-green-500 hover:bg-green-600',
    },
    ...(contact.linkedin
      ? [
          {
            name: 'LinkedIn',
            url: contact.linkedin,
            icon: Linkedin,
            color: 'bg-blue-600 hover:bg-blue-700',
          },
        ]
      : []),
  ]

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">
            프로젝트나 협업에 관심이 있으시다면 언제든지 연락주세요.
          </p>

          {/* 이메일 텍스트 + 복사 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <div className="flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Mail size={20} className="text-gray-700 dark:text-gray-300" />
              <span className="text-gray-900 dark:text-white font-medium text-lg">
                {contact.email}
              </span>
              <button
                onClick={copyEmail}
                className="ml-2 p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center justify-center"
                aria-label="이메일 복사"
                title="이메일 복사"
              >
                {emailCopied ? (
                  <Check size={18} className="text-white" />
                ) : (
                  <Copy size={18} className="text-white" />
                )}
              </button>
            </div>
          </motion.div>

          {/* 다른 링크 버튼들 */}
          <div className="flex flex-wrap justify-center gap-4">
            {contactLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 1) * 0.1 }}
                  className={`${link.color} text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2`}
                >
                  <Icon size={20} />
                  {link.name}
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

