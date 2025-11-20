import { motion } from 'framer-motion'
import { Mail, Github, FileText, Linkedin } from 'lucide-react'
import contactData from '../data/contact.json'

const Contact = () => {
  const contact = contactData

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6 },
  }

  const contactLinks = [
    {
      name: 'Email',
      url: `mailto:${contact.email}`,
      icon: Mail,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
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
                  transition={{ delay: index * 0.1 }}
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

